<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Skill;
use Illuminate\Support\Facades\Schema;

class SkillSeeder extends Seeder
{
    /**
     * Skills are no longer self-rated with a percentage. Each one is
     * proven by the real projects it was used on — see ProjectSeeder,
     * which attaches these skills to Summit Guest House, Aligned
     * Surveyors, ZamSam and Mom&Pop POS.
     */
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        Skill::truncate();
        Schema::enableForeignKeyConstraints();

        $skillsData = [
            'Languages' => [
                'PHP',
                'JavaScript',
                'TypeScript',
                'SQL',
                'HTML & CSS',
            ],
            'Frameworks' => [
                'Laravel',
                'React',
                'Inertia.js',
                'Tailwind CSS',
                'Next.js',
            ],
            'Offline-First & Data Sync' => [
                'Dexie.js (IndexedDB)',
                'Client-side UUID Sync',
                'Multi-Tenant Architecture',
            ],
            'DevOps & Infrastructure' => [
                'Docker & Compose',
                'Ubuntu Server / Linux',
                'MySQL & PostgreSQL',
                'Git & GitHub Workflows',
                'Render Deployments',
            ],
            'Automation' => [
                'AI Prompt Engineering',
                'Automated Workflow Scripting',
                'Backend Task Scheduling / Queues',
            ],
        ];

        foreach ($skillsData as $categoryName => $skills) {
            $category = Category::firstOrCreate(['name' => $categoryName]);

            foreach ($skills as $skillName) {
                Skill::create([
                    'category_id' => $category->id,
                    'name' => $skillName,
                ]);
            }
        }
    }
}
