<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Skill;

class ProjectSeeder extends Seeder
{
    /**
     * Real, shipped work — replaces any placeholder/demo project rows.
     * Edit the description/techstack copy below to match each build
     * exactly; the skill_names arrays control which skill chips each
     * project shows up under on the homepage.
     */
    public function run(): void
    {
        $projects = [
            [
                'name' => 'Summit Guest House',
                'url' => 'https://summitguesthouse.org',
                'description' => 'Booking-focused website for a guest house, built to give guests a fast, mobile-friendly way to view rooms, amenities and rates and get in touch directly.',
                'techstack' => 'Laravel, Tailwind CSS',
                'deployment' => 'Live production site',
                'skill_names' => ['PHP', 'Laravel', 'Tailwind CSS', 'HTML & CSS', 'Git & GitHub Workflows'],
            ],
            [
                'name' => 'Aligned Surveyors',
                'url' => 'https://alignedsurveyors.co.zw',
                'description' => 'Corporate site for a Zimbabwean land-surveying practice, presenting their services and credentials to commercial and private clients.',
                'techstack' => 'Laravel, Tailwind CSS',
                'deployment' => 'Live production site',
                'skill_names' => ['PHP', 'Laravel', 'Tailwind CSS', 'HTML & CSS', 'Git & GitHub Workflows'],
            ],
            [
                'name' => 'ZamSam',
                'url' => 'https://zamsam.org',
                'description' => 'Organisation website built to communicate ZamSam\'s work clearly to visitors, with a simple content structure that is easy to keep up to date.',
                'techstack' => 'Laravel, Tailwind CSS',
                'deployment' => 'Live production site',
                'skill_names' => ['PHP', 'Laravel', 'Tailwind CSS', 'HTML & CSS', 'Git & GitHub Workflows'],
            ],
            [
                'name' => 'Mom&Pop POS',
                'url' => '',
                'description' => 'Multi-tenant, offline-first point-of-sale platform for small shops, bars and restaurants across Zimbabwe and the wider SADC region. Runs reliably over unstable mobile networks using client-side sync and a device-pairing PIN login built for shared, informal-sector hardware.',
                'techstack' => 'Laravel, React, Inertia.js, Tailwind CSS, Dexie.js (IndexedDB)',
                'deployment' => 'In active development · Render',
                'skill_names' => [
                    'PHP', 'Laravel', 'React', 'Inertia.js', 'Tailwind CSS', 'JavaScript',
                    'Dexie.js (IndexedDB)', 'Client-side UUID Sync', 'Multi-Tenant Architecture',
                    'MySQL & PostgreSQL', 'Render Deployments', 'Git & GitHub Workflows',
                ],
            ],
        ];

        foreach ($projects as $data) {
            $skillNames = $data['skill_names'];
            unset($data['skill_names']);

            $project = Project::updateOrCreate(
                ['name' => $data['name']],
                $data
            );

            $skillIds = Skill::whereIn('name', $skillNames)->pluck('id');
            $project->skills()->sync($skillIds);
        }
    }
}
