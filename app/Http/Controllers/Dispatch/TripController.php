<?php

namespace App\Http\Controllers\Dispatch;

use App\Http\Controllers\Controller;
use App\Models\Trip;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TripController extends Controller {
    public function index(Request $req) {
        $this->authorize('viewAny', Trip::class);
        $trips = Trip::latest()->paginate(10)->through(fn($t)=>[
            'id'=>$t->id,'user'=>$t->user->name,'driver'=>$t->driver?->name,
            'pickup'=>$t->pickup,'dropoff'=>$t->dropoff,'status'=>$t->status,'fare'=>$t->fare
        ]);
        return Inertia::render('Dispatch/TripsIndex', ['trips'=>$trips]);
    }

    public function assign(Request $req, Trip $trip) {
        $this->authorize('update', $trip);
        $trip->update(['driver_id'=>$req->driver_id, 'status'=>'assigned']);
        return back()->with('success','Trip assigned.');
    }

    public function mine(Request $req) {
        $trips = Trip::where('driver_id', $req->user()->id)->latest()->get();
        return Inertia::render('Driver/MyTrips', ['trips'=>$trips]);
    }

    public function accept(Request $req, Trip $trip) {
        $this->authorize('update', $trip);
        $trip->update(['status'=>'accepted']);
        return back();
    }

    public function complete(Request $req, Trip $trip) {
        $this->authorize('update', $trip);
        $trip->update(['status'=>'completed']);
        return back();
    }
}
