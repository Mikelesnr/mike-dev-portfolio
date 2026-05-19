<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Skill;
use Illuminate\Support\Facades\Schema;

class SkillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Skill::truncate();
        Schema::enableForeignKeyConstraints();

        // Define skills mapped directly to the names of the categories we just created
        $skillsData = [
            'Languages' => [
                ['name' => 'PHP', 'percentage' => 95],
                ['name' => 'JavaScript', 'percentage' => 90],
                ['name' => 'TypeScript', 'percentage' => 85],
                ['name' => 'SQL', 'percentage' => 90],
                ['name' => 'HTML & CSS', 'percentage' => 95],
            ],
            'Frameworks' => [
                ['name' => 'Laravel', 'percentage' => 95],
                ['name' => 'React', 'percentage' => 90],
                ['name' => 'Inertia.js', 'percentage' => 95],
                ['name' => 'Tailwind CSS', 'percentage' => 95],
            ],
            'DevOps' => [
                ['name' => 'Docker & Compose', 'percentage' => 85],
                ['name' => 'Ubuntu Server / Linux', 'percentage' => 90],
                ['name' => 'MySQL Server Management', 'percentage' => 90],
                ['name' => 'Git & GitHub Workflows', 'percentage' => 95],
            ],
            'Automation' => [
                ['name' => 'AI Prompt Engineering (Gemini API)', 'percentage' => 90],
                ['name' => 'Automated Workflow Scripting', 'percentage' => 85],
                ['name' => 'Backend Task Scheduling / Queues', 'percentage' => 90],
            ],
        ];

        foreach ($skillsData as $categoryName => $skills) {
            // Dynamically query the category ID that was just seeded
            $category = Category::where('name', $categoryName)->first();

            if ($category) {
                foreach ($skills as $skill) {
                    Skill::create([
                        'category_id' => $category->id,
                        'name' => $skill['name'],
                        'percentage' => $skill['percentage'],
                    ]);
                }
            }
        }
    }
}
