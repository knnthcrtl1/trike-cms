<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RouteController extends Controller
{
    public function index(Request $request)
    {
        $routes = Route::query()
            ->when($request->search, fn($q, $v) => $q->where('name', 'like', "%{$v}%")
                ->orWhere('origin', 'like', "%{$v}%")
                ->orWhere('destination', 'like', "%{$v}%"))
            ->latest()
            ->paginate(10);

        return Inertia::render('Admin/Routes/Index', [
            'routes' => $routes,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Routes/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'origin' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'distance_km' => 'nullable|numeric|min:0',
            'estimated_duration_minutes' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        Route::create($validated);

        return redirect()->route('admin.routes.index')->with('success', 'Route created successfully.');
    }

    public function edit(Route $route)
    {
        return Inertia::render('Admin/Routes/Edit', [
            'route' => $route,
        ]);
    }

    public function update(Request $request, Route $route)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'origin' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'distance_km' => 'nullable|numeric|min:0',
            'estimated_duration_minutes' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $route->update($validated);

        return redirect()->route('admin.routes.index')->with('success', 'Route updated successfully.');
    }

    public function destroy(Route $route)
    {
        $route->delete();
        return redirect()->route('admin.routes.index')->with('success', 'Route deleted successfully.');
    }
}

