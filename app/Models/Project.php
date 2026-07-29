<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'url',
        'name',
        'description',
        'techstack',
        'deployment',
    ];

    /**
     * Skills demonstrated by this project. Powers the "used on"
     * chips shown under each skill on the homepage.
     */
    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class);
    }
}
