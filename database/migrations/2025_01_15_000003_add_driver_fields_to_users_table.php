<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->after('email');
            $table->string('license_number')->nullable()->after('phone');
            $table->string('vehicle_type')->nullable()->after('license_number');
            $table->string('vehicle_plate')->nullable()->after('vehicle_type');
            $table->boolean('is_active')->default(true)->after('vehicle_plate');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['phone', 'license_number', 'vehicle_type', 'vehicle_plate', 'is_active']);
        });
    }
};

