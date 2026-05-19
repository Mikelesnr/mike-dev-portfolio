<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $adminPassword = env('ADMIN_MASTER_PASSWORD', 'FallbackSecureDefaultPassword123!');

        User::updateOrCreate(
            ['email' => 'mwanza.n.m@gmail.com'],
            [
                'name' => 'Michael Mwanza',
                'password' => Hash::make($adminPassword),
                'is_admin' => true,
                'email_verified_at' => now(), // ⚡ Auto-verifies your account instantly on generation!
            ]
        );

        $this->call([
            CategorySeeder::class,
            SkillSeeder::class,
            SettingSeeder::class,
        ]);
    }
}
