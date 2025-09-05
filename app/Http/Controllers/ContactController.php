<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactAcknowledgement;
use App\Mail\ContactNotification;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        try {
            // Send thank-you email to sender
            Mail::to($validated['email'])->send(new ContactAcknowledgement($validated));
            Log::info('✅ ContactAcknowledgement sent to ' . $validated['email']);

            // Send notification email to you
            Mail::to('micky.mpd@gmail.com')->send(new ContactNotification($validated));
            Log::info('✅ ContactNotification sent to micky.mpd@gmail.com', $validated);
        } catch (\Exception $e) {
            Log::error('❌ Email sending failed: ' . $e->getMessage());
            Log::debug('📦 Payload:', $validated);

            return response()->json([
                'success' => false,
                'message' => 'Email failed to send. Please try again later.',
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => 'Thanks for reaching out! I’ll get back to you soon.',
        ]);
    }
}
