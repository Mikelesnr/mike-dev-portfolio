<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ContactController;

// ✅ Inertia frontend routes
Route::get('/', fn() => Inertia::render('Home'));
Route::get('/work', fn() => Inertia::render('Work'));
Route::get('/contact', fn() => Inertia::render('Contact'));

// ✅ Public API for frontend (read-only)
Route::apiResource('projects', ProjectController::class)->only(['index', 'show']);
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');

// ✅ Blade/admin backend routes
Route::get('/admin', [ProjectController::class, 'adminIndex'])->name('admin.index');
Route::post('/projects', [ProjectController::class, 'store'])->name('admin.projects.store');
Route::get('/projects/{id}/edit', [ProjectController::class, 'edit'])->name('admin.projects.edit');
Route::put('/projects/{id}', [ProjectController::class, 'update'])->name('admin.projects.update');
Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy');
