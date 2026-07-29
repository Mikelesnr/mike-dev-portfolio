<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Facades\Schema;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Category::truncate();
        Schema::enableForeignKeyConstraints();

        $categories = [
            'Languages',
            'Frameworks',
            'Offline-First & Data Sync',
            'DevOps & Infrastructure',
            'Automation',
        ];

        foreach ($categories as $name) {
            Category::create(['name' => $name]);
        }
    }
}
