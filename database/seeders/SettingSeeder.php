<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting; // ⚡ Using the model directly

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        Setting::updateOrCreate(
            ['key' => 'intro_video_url'],
            ['value' => 'https://www.youtube.com/embed/e5EyRIomrBM']
        );
    }
}
