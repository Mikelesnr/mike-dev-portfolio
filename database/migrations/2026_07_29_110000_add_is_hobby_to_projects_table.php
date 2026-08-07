<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Distinguishes real client/business work from hobby or side
     * projects (e.g. Netlify/Render personal builds) so visitors
     * and potential clients know which sites are fair game to poke
     * around in versus real production customer work.
     */
    public function up(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->boolean('is_hobby')->default(false)->after('is_featured');
        });
    }

    public function down(): void
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('is_hobby');
        });
    }
};
