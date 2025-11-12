<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class RolesSeeder extends Seeder {
    public function run(): void {
        foreach (['admin','dispatcher','driver','user'] as $r) {
            Role::firstOrCreate(['name'=>$r]);
        }
    }
}
