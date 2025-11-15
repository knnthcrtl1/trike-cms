<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Fare;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FareController extends Controller
{
    public function index(Request $request)
    {
        $fares = Fare::query()
            ->when($request->search, fn($q, $v) => $q->where('name', 'like', "%{$v}%"))
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Fares/Index', [
            'fares' => $fares,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Fares/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'base_fare' => 'required|numeric|min:0',
            'per_km_rate' => 'nullable|numeric|min:0',
            'per_minute_rate' => 'nullable|numeric|min:0',
            'minimum_fare' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        Fare::create($validated);

        return redirect()->route('admin.fares.index')->with('success', 'Fare created successfully.');
    }

    public function edit(Fare $fare)
    {
        return Inertia::render('Admin/Fares/Edit', [
            'fare' => $fare,
        ]);
    }

    public function update(Request $request, Fare $fare)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'base_fare' => 'required|numeric|min:0',
            'per_km_rate' => 'nullable|numeric|min:0',
            'per_minute_rate' => 'nullable|numeric|min:0',
            'minimum_fare' => 'required|numeric|min:0',
            'is_active' => 'boolean',
        ]);

        $fare->update($validated);

        return redirect()->route('admin.fares.index')->with('success', 'Fare updated successfully.');
    }

    public function destroy(Fare $fare)
    {
        $fare->delete();
        return redirect()->route('admin.fares.index')->with('success', 'Fare deleted successfully.');
    }
}

