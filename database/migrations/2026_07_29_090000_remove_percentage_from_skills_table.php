<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Skills are no longer ranked by a self-assigned percentage.
     * Proficiency is now demonstrated by linking a skill to the
     * real projects it was used on (see project_skill pivot).
     */
    public function up(): void
    {
        Schema::table('skills', function (Blueprint $table) {
            if (Schema::hasColumn('skills', 'percentage')) {
                $table->dropColumn('percentage');
            }
        });
    }

    public function down(): void
    {
        Schema::table('skills', function (Blueprint $table) {
            $table->integer('percentage')->default(50);
        });
    }
};
