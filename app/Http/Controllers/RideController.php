<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\Fare;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RideController extends Controller
{
    public function create()
    {
        // Get the first active fare for estimation
        $activeFare = Fare::where('is_active', true)->first();
        
        return Inertia::render('Ride/Request', [
            'activeFare' => $activeFare ? [
                'base_fare' => $activeFare->base_fare,
                'per_km_rate' => $activeFare->per_km_rate ?? 0,
                'per_minute_rate' => $activeFare->per_minute_rate ?? 0,
                'minimum_fare' => $activeFare->minimum_fare,
            ] : null,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'pickup' => 'required|string|max:255',
            'dropoff' => 'required|string|max:255',
            'distance_km' => 'nullable|numeric|min:0',
            'estimated_duration_minutes' => 'nullable|integer|min:0',
        ]);

        // Get active fare for calculation
        $activeFare = Fare::where('is_active', true)->first();
        
        if (!$activeFare) {
            return back()->withErrors(['fare' => 'No active fare configuration found.']);
        }

        // Calculate fare
        $fare = $this->calculateFare(
            $activeFare,
            $validated['distance_km'] ?? 0,
            $validated['estimated_duration_minutes'] ?? 0
        );

        // Create trip
        $trip = Trip::create([
            'user_id' => $request->user()->id,
            'pickup' => $validated['pickup'],
            'dropoff' => $validated['dropoff'],
            'status' => 'requested',
            'fare' => $fare,
        ]);

        return redirect()->route('ride.history')->with('success', 'Ride requested successfully!');
    }

    public function index(Request $request)
    {
        $trips = Trip::where('user_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(fn($trip) => [
                'id' => $trip->id,
                'pickup' => $trip->pickup,
                'dropoff' => $trip->dropoff,
                'status' => $trip->status,
                'fare' => $trip->fare,
                'driver' => $trip->driver?->name,
                'created_at' => $trip->created_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('Ride/History', [
            'trips' => $trips,
        ]);
    }

    public function estimateFare(Request $request)
    {
        $validated = $request->validate([
            'distance_km' => 'nullable|numeric|min:0',
            'estimated_duration_minutes' => 'nullable|integer|min:0',
        ]);

        $activeFare = Fare::where('is_active', true)->first();
        
        if (!$activeFare) {
            return response()->json(['error' => 'No active fare configuration found.'], 404);
        }

        $fare = $this->calculateFare(
            $activeFare,
            $validated['distance_km'] ?? 0,
            $validated['estimated_duration_minutes'] ?? 0
        );

        return response()->json([
            'fare' => number_format($fare, 2),
            'breakdown' => [
                'base_fare' => $activeFare->base_fare,
                'distance_charge' => ($validated['distance_km'] ?? 0) * ($activeFare->per_km_rate ?? 0),
                'time_charge' => ($validated['estimated_duration_minutes'] ?? 0) * ($activeFare->per_minute_rate ?? 0),
                'minimum_fare' => $activeFare->minimum_fare,
            ],
        ]);
    }

    private function calculateFare(Fare $fare, float $distanceKm, int $durationMinutes): float
    {
        $baseFare = $fare->base_fare;
        $distanceCharge = ($distanceKm * ($fare->per_km_rate ?? 0));
        $timeCharge = ($durationMinutes * ($fare->per_minute_rate ?? 0));
        
        $totalFare = $baseFare + $distanceCharge + $timeCharge;
        
        // Ensure minimum fare
        return max($totalFare, $fare->minimum_fare);
    }
}

