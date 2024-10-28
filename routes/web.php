<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProjectController;

// inertia route for front end
Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/work', function () {
    return Inertia::render('Work');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});

//populate frontend projects page
Route::apiResource('projects', ProjectController::class);

// blade routes for back end

//admin view all
Route::get('/admin', [ProjectController::class, 'adminIndex'])->name('admin.index');
Route::post('/projects', [ProjectController::class, 'store'])->name('projects.store');
Route::get('/projects/{id}/edit', [ProjectController::class, 'edit'])->name('projects.edit');
Route::put('/projects/{id}', [ProjectController::class, 'update'])->name('projects.update');
Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])->name('projects.destroy');