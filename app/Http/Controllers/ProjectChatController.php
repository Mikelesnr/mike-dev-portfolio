<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Project;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProjectChatController extends Controller
{
    public function chat(Request $request)
    {
        Log::info('🤖 ChatBot Request Received', [
            'input' => $request->all(),
            'ip'    => $request->ip(),
        ]);

        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        try {
            // 1. Build database context from Categories and Skills
            $skillsAndCategories = Category::has('skills')
                ->with('skills.projects')
                ->get()
                ->map(function ($category) {
                    $skills = $category->skills->map(function ($skill) {
                        $usedOn = $skill->projects->pluck('name')->filter()->join(', ');
                        return $usedOn
                            ? "{$skill->name} (used on: {$usedOn})"
                            : $skill->name;
                    })->join(', ');

                    return "- {$category->name}: {$skills}";
                })
                ->join("\n");

            // 2. Build database context from Projects
            $projects = Project::all()
                ->map(function ($project) {
                    $details = "- **{$project->name}**: {$project->description} \n"
                        . "  * Stack: {$project->techstack}\n"
                        . "  * Deployment: {$project->deployment}";

                    if (!empty($project->url)) {
                        $details .= "\n  * Live URL: {$project->url}";
                    }

                    return $details;
                })
                ->join("\n\n");

            // 3. System Prompt setup
            $systemInstruction = "You are an AI assistant built into Michael Mwanza's portfolio website. Your purpose is to answer questions about Michael's technical skills, experience, and development projects. Use the following dynamic database data as your absolute source of truth:\n\n"
                . "### Technical Skills Matrix (Categorized):\n{$skillsAndCategories}\n\n"
                . "### Software Projects Inventory:\n{$projects}\n\n"
                . "Rules:\n"
                . "- Be highly professional, helpful, concise, and technical.\n"
                . "- Only provide and discuss information provided in the context directly above.\n"
                . "- If a visitor asks about a skill, tool, or project that is missing from the data above, politely explain that it is not in Michael's current production stack.";

            $apiKey = config('services.gemini.key') ?? env('GEMINI_API_KEY');

            if (!$apiKey) {
                throw new \Exception('GEMINI_API_KEY is missing from environment configuration.');
            }

            // 4. Send HTTP REST Request to Gemini 2.5 Flash API
            $response = Http::post("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={$apiKey}", [
                'system_instruction' => [
                    'parts' => [
                        ['text' => $systemInstruction]
                    ]
                ],
                'contents' => [
                    [
                        'role' => 'user',
                        'parts' => [
                            ['text' => $request->input('message')]
                        ]
                    ]
                ],
                'generationConfig' => [
                    'temperature'     => 0.2,
                    'maxOutputTokens' => 450,
                ]
            ]);

            Log::info('🤖 Gemini API Response', [
                'status' => $response->status(),
                'body'   => $response->body(),
            ]);

            if ($response->failed()) {
                throw new \Exception('Gemini API Error Response: ' . $response->body());
            }

            $result = $response->json();
            $reply  = $result['candidates'][0]['content']['parts'][0]['text'] ?? "I'm having a hard time loading the data right now.";

            return response()->json([
                'success' => true,
                'reply'   => $reply,
            ]);
        } catch (\Throwable $e) {
            Log::error('❌ Portfolio AI Assistant failed', [
                'message' => $e->getMessage(),
                'file'    => $e->getFile(),
                'line'    => $e->getLine(),
                'trace'   => $e->getTraceAsString(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'DEBUG ERROR: ' . $e->getMessage(),
                'file'    => $e->getFile() . ':' . $e->getLine(),
            ], 500);
        }
    }
}
