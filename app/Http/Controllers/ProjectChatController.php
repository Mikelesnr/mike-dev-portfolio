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
        // Limit context spamming
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        try {
            // 1. Map categories and skills (including mastery percentages)
            $skillsAndCategories = Category::has('skills')
                ->with('skills')
                ->get()
                ->map(function ($category) {
                    $skills = $category->skills->map(function ($skill) {
                        return "{$skill->name} ({$skill->percentage}%)";
                    })->join(', ');

                    return "- {$category->name}: {$skills}";
                })
                ->join("\n");

            // 2. Map projects using your exact database columns: name, techstack, deployment, description
            $projects = Project::all()
                ->map(function ($project) {
                    $details = "- **{$project->name}**: {$project->description} \n"
                        . "  * Stack: {$project->techstack}\n"
                        . "  * Deployment: {$project->deployment}";

                    if ($project->url) {
                        $details .= "\n  * Live URL: {$project->url}";
                    }

                    return $details;
                })
                ->join("\n\n");

            // 3. Inject explicit truth context for Gemini
            $systemInstruction = "You are an AI assistant built into Michael Mwanza's portfolio website. Your purpose is to answer questions about Michael's technical skills, experience, and development projects. Use the following dynamic database data as your absolute source of truth:\n\n"
                . "### Technical Skills Matrix (Categorized):\n{$skillsAndCategories}\n\n"
                . "### Software Projects Inventory:\n{$projects}\n\n"
                . "Rules:\n"
                . "- Be highly professional, helpful, concise, and technical.\n"
                . "- Only provide and discuss information provided in the context directly above.\n"
                . "- If a visitor asks about a skill, tool, or project that is missing from the data above, politely explain that it is not in Michael's current production stack.";

            // 4. Send HTTP REST Request to Gemini 1.5 Flash API (Port 443)
            $response = Http::withHeaders([
                'Authorization' => 'Bearer ' . env('GROQ_API_KEY'),
                'Content-Type' => 'application/json',
            ])->post("https://api.groq.com/openai/v1/chat/completions", [
                'model' => 'llama-3.3-70b-versatile',
                'messages' => [
                    ['role' => 'system', 'content' => $systemInstruction],
                    ['role' => 'user', 'content' => $request->input('message')]
                ],
                'temperature' => 0.2,
                'max_tokens' => 450,
            ]);

            if ($response->failed()) {
                throw new \Exception('Grok API Error Response: ' . $response->body());
            }

            $result = $response->json();
            $reply = $result['choices'][0]['message']['content'] ?? "I'm having a hard time loading the data right now.";

            return response()->json([
                'success' => true,
                'reply' => $reply,
            ]);
        } catch (\Exception $e) {
            // This logs the real error to your storage/logs/laravel.log file
            Log::error('❌ Portfolio AI Assistant failed: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);

            // This sends the real error back to the chat box so you can see it
            return response()->json([
                'success' => false,
                'message' => 'DEBUG ERROR: ' . $e->getMessage(),
            ], 500);
        }
    }
}
