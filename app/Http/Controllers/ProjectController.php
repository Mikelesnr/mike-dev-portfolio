<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\View\View;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        // ⚡ Resolved P1005: Added all 5 arguments to satisfy static analysis
        $projects = Project::paginate(3, ['*'], 'page', null, null);
        return response()->json($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'url' => 'required|url',
            'name' => 'required|string',
            'description' => 'required|string',
            'techstack' => 'required|string',
            'deployment' => 'required|string',
        ]);

        Project::create($request->all());

        // Redirects to React Dashboard for Inertia requests, Blade admin for legacy
        if ($request->wantsJson() || $request->header('X-Inertia')) {
            return redirect()->route('dashboard')->with('success', 'Project added successfully');
        }

        return redirect()->route('admin.index')->with('success', 'Project added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $project = Project::findOrFail($id);
        return response()->json($project);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id): View
    {
        // ⚡ Resolved P1132: Added explicit string type hint
        $project = Project::findOrFail($id);
        return view('edit', compact('project'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id): RedirectResponse
    {
        // ⚡ Resolved P1132: Added explicit string type hint
        $request->validate([
            'url' => 'required|url',
            'name' => 'required|string',
            'description' => 'required|string',
            'techstack' => 'required|string',
            'deployment' => 'required|string',
        ]);

        $project = Project::findOrFail($id);
        $project->update($request->all());

        // Redirects to React Dashboard for Inertia requests, Blade admin for legacy
        if ($request->wantsJson() || $request->header('X-Inertia')) {
            return redirect()->route('dashboard')->with('success', 'Project updated successfully');
        }

        return redirect()->route('admin.index')->with('success', 'Project updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id): RedirectResponse
    {
        // ⚡ Resolved P1132: Added explicit string type hint
        $project = Project::findOrFail($id);
        $project->delete();

        // Redirects to React Dashboard for Inertia requests, Blade admin for legacy
        if ($request->wantsJson() || $request->header('X-Inertia')) {
            return redirect()->route('dashboard')->with('success', 'Project deleted successfully');
        }

        return redirect()->route('admin.index')->with('success', 'Project deleted successfully');
    }

    /**
     * Get all projects unpaginated.
     */
    public function allProjects()
    {
        return Project::all();
    }

    /**
     * Old Blade admin listing index page.
     */
    public function adminIndex(): View
    {
        $projects = Project::all();
        return view('admin', compact('projects'));
    }
}
