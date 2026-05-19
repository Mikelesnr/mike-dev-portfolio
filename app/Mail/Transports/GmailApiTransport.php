<?php

namespace App\Mail\Transports;

use Symfony\Component\Mailer\SentMessage;
use Symfony\Component\Mailer\Transport\AbstractTransport;
use Symfony\Component\Mime\MessageConverter;
use Google\Client;
use Google\Service\Gmail;
use Google\Service\Gmail\Message;
use Exception;

class GmailApiTransport extends AbstractTransport
{
    protected Client $client;
    protected Gmail $service;

    public function __construct()
    {
        parent::__construct();

        // 1. Initialize the native Google client API setup
        $this->client = new Client();
        $this->client->setClientId(env('OAUTH_CLIENT_ID'));
        $this->client->setClientSecret(env('OAUTH_CLIENT_SECRET'));
        $this->client->addScope(Gmail::GMAIL_SEND);
        $this->client->refreshToken(env('OAUTH_REFRESH_TOKEN'));

        $this->service = new Gmail($this->client);
    }

    /**
     * This is the method Laravel calls when it processes an outbound mail payload.
     */
    protected function doSend(SentMessage $message): void
    {
        // 2. Convert Laravel's clean Mailable object chain back into a valid RFC 2822 email string
        $email = MessageConverter::toEmail($message->getOriginalMessage());
        $rawMessageString = $email->toString();

        // 3. Encode the compiled payload into Google's strict web-safe base64 format
        $mimeSafeString = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($rawMessageString));

        try {
            $gmailMessage = new Message();
            $gmailMessage->setRaw($mimeSafeString);

            // 4. Broadcast the message over standard port 443 HTTPS REST traffic
            $this->service->users_messages->send('me', $gmailMessage);
        } catch (Exception $e) {
            throw new Exception('Gmail API Custom Driver failed: ' . $e->getMessage());
        }
    }

    /**
     * Get the string representation of the transport.
     */
    public function __toString(): string
    {
        return 'gmail_api';
    }
}
