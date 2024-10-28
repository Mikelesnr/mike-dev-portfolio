<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $projects = Project::paginate(3);
        return response()->json($projects);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'url' => 'required',
            'name' => 'required',
            'description' => 'required',
            'techstack' => 'required',
            'deployment' => 'required',
        ]);

        Project::create($request->all());
        return redirect()->route('admin.index')->with('success', 'Project added successfully');
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = Project::findOrFail($id);
        return $project;
    }

    /**
     * Update the specified resource in storage.
     */
    public function edit($id)
    {
        $project = Project::findOrFail($id);
        return view('edit', compact('project'));
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'url' => 'required',
            'name' => 'required',
            'description' => 'required',
            'techstack' => 'required',
            'deployment' => 'required',
        ]);

        $project = Project::findOrFail($id);
        $project->update($request->all());
        return redirect()->route('admin.index')->with('success', 'Project updated successfully');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
        return redirect()->route('admin.index')->with('success', 'Project deleted successfully');
    }

    public function allProjects()
    {
        return Project::all();
    }



    public function adminIndex()
    {
        $projects = Project::all();
        return view('admin', compact('projects'));
    }
}