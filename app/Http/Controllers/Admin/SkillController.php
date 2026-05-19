<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    // Store a new skill nested under a category
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|max:255',
            'percentage' => 'required|integer|min:0|max:100',
        ]);

        Skill::create($request->all());

        return redirect()->back()->with('success', 'Skill added successfully.');
    }

    // Update an existing skill's metrics or category
    public function update(Request $request, $id)
    {
        $skill = Skill::findOrFail($id);

        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|max:255',
            'percentage' => 'required|integer|min:0|max:100',
        ]);

        $skill->update($request->all());

        return redirect()->back()->with('success', 'Skill updated successfully.');
    }

    // Delete an isolated skill
    public function destroy($id)
    {
        $skill = Skill::findOrFail($id);
        $skill->delete();

        return redirect()->back()->with('success', 'Skill removed successfully.');
    }
}
