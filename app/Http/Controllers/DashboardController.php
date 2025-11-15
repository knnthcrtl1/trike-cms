<?php

namespace App\Http\Controllers;

use App\Models\Trip;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $today = now()->startOfDay();
        
        // Total trips today
        $totalTripsToday = Trip::whereDate('created_at', today())->count();
        
        // Active drivers (drivers with is_active = true)
        $activeDrivers = User::drivers()->where('is_active', true)->count();
        
        // Completed trips (all time, or today - I'll do today for consistency)
        $completedTripsToday = Trip::where('status', 'completed')
            ->whereDate('updated_at', today())
            ->count();
        
        // Revenue (sum of fares from completed trips today)
        $revenueToday = Trip::where('status', 'completed')
            ->whereDate('updated_at', today())
            ->sum('fare') ?? 0;

        return Inertia::render('Home', [
            'metrics' => [
                'totalTripsToday' => $totalTripsToday,
                'activeDrivers' => $activeDrivers,
                'completedTripsToday' => $completedTripsToday,
                'revenueToday' => number_format($revenueToday, 2),
            ],
        ]);
    }
}

