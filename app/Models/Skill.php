<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Skill extends Model
{
    protected $fillable = ['category_id', 'name', 'percentage'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }
}
