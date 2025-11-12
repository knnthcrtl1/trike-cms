<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('trips', function (Blueprint $t) {
            $t->id();
            $t->foreignId('user_id')->constrained()->cascadeOnDelete();     // requester
            $t->foreignId('driver_id')->nullable()->constrained('users');   // driver user
            $t->string('pickup');
            $t->string('dropoff');
            $t->enum('status',['requested','assigned','accepted','in_progress','completed','cancelled'])->default('requested');
            $t->decimal('fare',8,2)->nullable();
            $t->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('trips');
    }
};
