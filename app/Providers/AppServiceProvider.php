<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Mail;
use App\Mail\Transports\GmailApiTransport;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // 
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // 🔒 1. Force Secure HTTPS schema strictly in Production Environment
        if (app()->environment('production')) {
            URL::forceScheme('https');
        }

        // 🔒 2. Define Administrator Permission Gate for Portfolio Actions
        // Loose evaluation (== 1) ensures it flags numeric tinyint values from your database perfectly
        Gate::define('manage-portfolio', function (User $user) {
            return $user->is_admin == 1 || $user->is_admin === true;
        });

        // ⚡ 3. Existing Custom Mailer Extension (Preserved intact)
        Mail::extend('gmail_api', function (array $config) {
            return new GmailApiTransport();
        });

        // ⚡ 4. Existing Asset Prefetching Strategy (Preserved intact)
        Vite::prefetch(concurrency: 3);
    }
}
