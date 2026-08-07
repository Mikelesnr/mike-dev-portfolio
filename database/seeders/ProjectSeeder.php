<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Customer;

class ProjectSeeder extends Seeder
{
    /**
     * Real, shipped work — replaces any placeholder/demo project rows.
     * Edit the description/techstack copy below to match each build
     * exactly; skill_names controls the skill chips each project shows
     * up under, and customer_name links it to a Customer row the same
     * way skills are linked to projects.
     */
    public function run(): void
    {
        $projects = [
            [
                'name' => 'Summit Guest House',
                'url' => 'https://summitguesthouse.org',
                'description' => 'Booking-focused website for a guest house, built to give guests a fast, mobile-friendly way to view rooms, amenities and rates and get in touch directly.',
                // Built earlier, before the Laravel/Inertia stack below —
                // scheduled to be migrated over. Update this once that happens.
                'techstack' => 'Next.js, Prisma, MySQL',
                'deployment' => 'Live production site (migrating to Laravel soon)',
                'is_featured' => true,
                'is_hobby' => false,
                'skill_names' => ['JavaScript', 'TypeScript', 'Next.js', 'Prisma', 'MySQL & PostgreSQL', 'Git & GitHub Workflows'],
                'customer_name' => 'Summit Guest House',
            ],
            [
                'name' => 'Aligned Surveyors',
                'url' => 'https://alignedsurveyors.co.zw',
                'description' => 'Corporate site for a Zimbabwean land-surveying practice, presenting their services and credentials to commercial and private clients.',
                'techstack' => 'Laravel, Tailwind CSS',
                'deployment' => 'Live production site',
                'is_featured' => true,
                'is_hobby' => false,
                'skill_names' => ['PHP', 'Laravel', 'Tailwind CSS', 'HTML & CSS', 'Git & GitHub Workflows'],
                'customer_name' => 'Aligned Surveyors',
            ],
            [
                'name' => 'ZamSam',
                'url' => 'https://zamsam.org',
                'description' => 'Organisation website built to communicate ZamSam\'s work clearly to visitors, with a simple content structure that is easy to keep up to date.',
                'techstack' => 'Laravel, Tailwind CSS',
                'deployment' => 'Live production site',
                'is_featured' => true,
                'is_hobby' => false,
                'skill_names' => ['PHP', 'Laravel', 'Tailwind CSS', 'HTML & CSS', 'Git & GitHub Workflows'],
                'customer_name' => 'ZamSam',
            ],
            [
                'name' => 'Mom&Pop POS',
                'url' => '',
                'description' => 'Multi-tenant, offline-first point-of-sale platform for small shops, bars and restaurants across Zimbabwe and the wider SADC region. Runs reliably over unstable mobile networks using client-side sync and a device-pairing PIN login built for shared, informal-sector hardware.',
                'techstack' => 'Laravel, React, Inertia.js, Tailwind CSS, Dexie.js (IndexedDB)',
                'deployment' => 'In active development · Render',
                'is_featured' => true,
                'is_hobby' => false, // own product, but built to real production standards
                'skill_names' => [
                    'PHP', 'Laravel', 'React', 'Inertia.js', 'Tailwind CSS', 'JavaScript',
                    'Dexie.js (IndexedDB)', 'Client-side UUID Sync', 'Multi-Tenant Architecture',
                    'MySQL & PostgreSQL', 'Render Deployments', 'Git & GitHub Workflows',
                ],
                'customer_name' => null, // own product, not client work
            ],
            [
                'name' => 'Neuro Resilience Gym',
                'url' => 'https://neuroresiliencegym.netlify.app',
                // Placeholder copy — update with the real description/stack.
                'description' => 'A personal wellness app exploring mental resilience training exercises. Built as a side project, not a commissioned client build — free to explore and experiment with.',
                'techstack' => 'React, Netlify',
                'deployment' => 'Live on Netlify · personal project',
                'is_featured' => false,
                'is_hobby' => true,
                'skill_names' => ['React', 'JavaScript', 'HTML & CSS'],
                'customer_name' => null, // hobby project, no client
            ],
        ];

        foreach ($projects as $data) {
            $skillNames = $data['skill_names'];
            $customerName = $data['customer_name'];
            unset($data['skill_names'], $data['customer_name']);

            $project = Project::updateOrCreate(
                ['name' => $data['name']],
                $data
            );

            $skillIds = Skill::whereIn('name', $skillNames)->pluck('id');
            $project->skills()->sync($skillIds);

            if ($customerName) {
                // Placeholder: business name used as the customer record.
                // Swap in the actual owner/contact name + logo_url via the
                // CMS (or edit here) whenever you have them.
                $customer = Customer::firstOrCreate(['name' => $customerName]);
                $customer->projects()->syncWithoutDetaching([$project->id]);
            }
        }
    }
}
