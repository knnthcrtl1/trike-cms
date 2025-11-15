<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Route extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'origin',
        'destination',
        'distance_km',
        'estimated_duration_minutes',
        'is_active',
    ];

    protected $casts = [
        'distance_km' => 'decimal:2',
        'estimated_duration_minutes' => 'integer',
        'is_active' => 'boolean',
    ];
}

