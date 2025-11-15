<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class DriverController extends Controller
{
    public function index(Request $request)
    {
        $drivers = User::drivers()
            ->when($request->search, fn($q, $v) => $q->where('name', 'like', "%{$v}%")->orWhere('email', 'like', "%{$v}%"))
            ->latest()
            ->paginate(10)
            ->through(fn($d) => [
                'id' => $d->id,
                'name' => $d->name,
                'email' => $d->email,
                'phone' => $d->phone,
                'license_number' => $d->license_number,
                'vehicle_type' => $d->vehicle_type,
                'vehicle_plate' => $d->vehicle_plate,
                'is_active' => $d->is_active,
                'created_at' => $d->created_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('Admin/Drivers/Index', [
            'drivers' => $drivers,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Drivers/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'nullable|string|max:20',
            'license_number' => 'required|string|max:50',
            'vehicle_type' => 'required|string|max:50',
            'vehicle_plate' => 'required|string|max:20',
            'is_active' => 'boolean',
        ]);

        $driver = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'phone' => $validated['phone'] ?? null,
            'license_number' => $validated['license_number'],
            'vehicle_type' => $validated['vehicle_type'],
            'vehicle_plate' => $validated['vehicle_plate'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        $driver->assignRole('driver');

        return redirect()->route('admin.drivers.index')->with('success', 'Driver created successfully.');
    }

    public function edit(User $driver)
    {
        if (!$driver->hasRole('driver')) {
            abort(404);
        }

        return Inertia::render('Admin/Drivers/Edit', [
            'driver' => [
                'id' => $driver->id,
                'name' => $driver->name,
                'email' => $driver->email,
                'phone' => $driver->phone,
                'license_number' => $driver->license_number,
                'vehicle_type' => $driver->vehicle_type,
                'vehicle_plate' => $driver->vehicle_plate,
                'is_active' => $driver->is_active,
            ],
        ]);
    }

    public function update(Request $request, User $driver)
    {
        if (!$driver->hasRole('driver')) {
            abort(404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $driver->id,
            'password' => 'nullable|string|min:8',
            'phone' => 'nullable|string|max:20',
            'license_number' => 'required|string|max:50',
            'vehicle_type' => 'required|string|max:50',
            'vehicle_plate' => 'required|string|max:20',
            'is_active' => 'boolean',
        ]);

        $driver->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'license_number' => $validated['license_number'],
            'vehicle_type' => $validated['vehicle_type'],
            'vehicle_plate' => $validated['vehicle_plate'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        if ($request->filled('password')) {
            $driver->update(['password' => Hash::make($validated['password'])]);
        }

        return redirect()->route('admin.drivers.index')->with('success', 'Driver updated successfully.');
    }

    public function destroy(User $driver)
    {
        if (!$driver->hasRole('driver')) {
            abort(404);
        }

        $driver->delete();
        return redirect()->route('admin.drivers.index')->with('success', 'Driver deleted successfully.');
    }
}

