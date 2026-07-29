<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Skill extends Model
{
    protected $fillable = ['category_id', 'name'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Real projects this skill was actually used to build.
     * This replaces the old self-rated percentage bar.
     */
    public function projects(): BelongsToMany
    {
        return $this->belongsToMany(Project::class);
    }
}
