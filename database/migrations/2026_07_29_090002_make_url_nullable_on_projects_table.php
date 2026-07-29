<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Projects still in development (e.g. Mom&Pop POS) don't have a
     * public URL yet — the Work page shows a "not live yet" state
     * instead of an iframe for these.
     *
     * Uses raw SQL rather than Blueprint::change() so the project
     * doesn't need to pull in doctrine/dbal just for this one column.
     */
    public function up(): void
    {
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'sqlite') {
            // SQLite has no real ALTER COLUMN; string columns are
            // dynamically typed, so NULLs are already accepted.
            return;
        }

        if ($driver === 'pgsql') {
            DB::statement('ALTER TABLE projects ALTER COLUMN url DROP NOT NULL');
            return;
        }

        // mysql / mariadb
        DB::statement('ALTER TABLE projects MODIFY url VARCHAR(255) NULL');
    }

    public function down(): void
    {
        $driver = Schema::getConnection()->getDriverName();

        if ($driver === 'sqlite') {
            return;
        }

        if ($driver === 'pgsql') {
            DB::statement("UPDATE projects SET url = '' WHERE url IS NULL");
            DB::statement('ALTER TABLE projects ALTER COLUMN url SET NOT NULL');
            return;
        }

        DB::statement("UPDATE projects SET url = '' WHERE url IS NULL");
        DB::statement('ALTER TABLE projects MODIFY url VARCHAR(255) NOT NULL');
    }
};
