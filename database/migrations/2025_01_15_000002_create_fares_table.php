<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fares', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('base_fare', 8, 2);
            $table->decimal('per_km_rate', 8, 2)->nullable();
            $table->decimal('per_minute_rate', 8, 2)->nullable();
            $table->decimal('minimum_fare', 8, 2)->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fares');
    }
};

