<?php

use App\Http\Controllers\ProjectController;

Route::apiResource('projects', ProjectController::class);

Route::get('all-projects', [ProjectController::class, 'allProjects']);