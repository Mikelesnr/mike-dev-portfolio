<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    // Store a new customer/business, linked to an existing project
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|max:255',
            'logo_url' => 'nullable|url',
            'project_id' => 'required|exists:projects,id',
        ]);

        $customer = Customer::create($request->only(['name', 'logo_url']));
        $customer->projects()->sync([$request->input('project_id')]);

        return redirect()->back()->with('success', 'Customer added successfully.');
    }

    // Update a customer's details or which project they're linked to
    public function update(Request $request, $id)
    {
        $customer = Customer::findOrFail($id);

        $request->validate([
            'name' => 'required|max:255',
            'logo_url' => 'nullable|url',
            'project_id' => 'required|exists:projects,id',
        ]);

        $customer->update($request->only(['name', 'logo_url']));
        $customer->projects()->sync([$request->input('project_id')]);

        return redirect()->back()->with('success', 'Customer updated successfully.');
    }

    // Remove a customer
    public function destroy($id)
    {
        $customer = Customer::findOrFail($id);
        $customer->delete();

        return redirect()->back()->with('success', 'Customer removed successfully.');
    }
}
