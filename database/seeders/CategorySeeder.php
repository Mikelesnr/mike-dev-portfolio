<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use Illuminate\Support\Facades\Schema;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Category::truncate();
        Schema::enableForeignKeyConstraints();

        $categories = [
            'Languages',
            'Frameworks',
            'DevOps',
            'Automation'
        ];

        foreach ($categories as $name) {
            Category::create(['name' => $name]);
        }
    }
}
