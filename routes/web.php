<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Dispatch\TripController;

// Single root route: Home for authed users, Welcome for guests
Route::get('/', function () {
    if (auth()->check()) {
        $today = now()->startOfDay();
        
        // Total trips today
        $totalTripsToday = \App\Models\Trip::whereDate('created_at', today())->count();
        
        // Active drivers (drivers with is_active = true)
        $activeDrivers = \App\Models\User::drivers()->where('is_active', true)->count();
        
        // Completed trips today
        $completedTripsToday = \App\Models\Trip::where('status', 'completed')
            ->whereDate('updated_at', today())
            ->count();
        
        // Revenue (sum of fares from completed trips today)
        $revenueToday = \App\Models\Trip::where('status', 'completed')
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

    return Inertia::render('Welcome', [
        'canLogin'      => Route::has('login'),
        'canRegister'   => Route::has('register'),
        'laravelVersion'=> Application::VERSION,
        'phpVersion'    => PHP_VERSION,
    ]);
})->name('home');

// Authenticated area
Route::middleware(['auth', 'verified'])->group(function () {

    // Admin-only
    Route::middleware('role:admin')->prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', UserController::class);
        Route::resource('drivers', \App\Http\Controllers\Admin\DriverController::class);
        Route::resource('routes', \App\Http\Controllers\Admin\RouteController::class);
        Route::resource('fares', \App\Http\Controllers\Admin\FareController::class);
        Route::resource('roles', \App\Http\Controllers\Admin\RoleController::class);
        Route::resource('permissions', \App\Http\Controllers\Admin\PermissionController::class);
    });

    // Dispatcher (and admin) for dispatch operations
    Route::middleware('role:dispatcher|admin')->prefix('dispatch')->name('dispatch.')->group(function () {
        Route::resource('trips', TripController::class)->only(['index','store','update','show']);
        Route::post('trips/{trip}/assign', [TripController::class,'assign'])->name('trips.assign');
    });

    // Driver
    Route::middleware('role:driver')->prefix('driver')->name('driver.')->group(function () {
        Route::get('trips', [TripController::class,'mine'])->name('trips.mine');
        Route::post('trips/{trip}/accept', [TripController::class,'accept'])->name('trips.accept');
        Route::post('trips/{trip}/complete', [TripController::class,'complete'])->name('trips.complete');
    });

    // Regular user (rider)
    Route::middleware('role:user')->prefix('ride')->name('ride.')->group(function () {
        Route::get('request', [\App\Http\Controllers\RideController::class,'create'])->name('request');
        Route::post('request', [\App\Http\Controllers\RideController::class,'store'])->name('request.store');
        Route::post('estimate', [\App\Http\Controllers\RideController::class,'estimateFare'])->name('estimate');
        Route::get('history',  [\App\Http\Controllers\RideController::class,'index'])->name('history');
    });

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Breeze / auth routes
require __DIR__.'/auth.php';
