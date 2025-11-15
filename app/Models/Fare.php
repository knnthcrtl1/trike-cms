<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Fare extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'base_fare',
        'per_km_rate',
        'per_minute_rate',
        'minimum_fare',
        'is_active',
    ];

    protected $casts = [
        'base_fare' => 'decimal:2',
        'per_km_rate' => 'decimal:2',
        'per_minute_rate' => 'decimal:2',
        'minimum_fare' => 'decimal:2',
        'is_active' => 'boolean',
    ];
}

