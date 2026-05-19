<?php

use Inertia\Inertia;
use App\Models\Category;
use App\Models\Setting;
use App\Models\Project;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminSettingController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\SkillController;
use App\Http\Controllers\ProjectChatController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| ✅ Inertia Frontend Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'categories' => Category::has('skills')->with('skills')->get(),
        'introVideoUrl' => Setting::where('key', 'intro_video_url')->value('value')
    ]);
});

Route::get('/work', fn() => Inertia::render('Work'));
Route::get('/contact', fn() => Inertia::render('Contact'));

/*
|--------------------------------------------------------------------------
| ✅ Public API for Frontend
|--------------------------------------------------------------------------
*/
Route::apiResource('projects', ProjectController::class)->only(['index', 'show']);
Route::post('/contact', [ContactController::class, 'submit'])->name('contact.submit');

/*
|--------------------------------------------------------------------------
| 🔒 Protected Blade/Admin Backend Routes
|--------------------------------------------------------------------------
| These routes handle the older blade-based configuration layouts.
*/
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::get('/', [ProjectController::class, 'adminIndex'])->name('admin.index');
    Route::get('/projects/create', [ProjectController::class, 'create'])->name('admin.projects.create');
    Route::post('/projects', [ProjectController::class, 'store'])->name('admin.projects.store');
    Route::get('/projects/{id}/edit', [ProjectController::class, 'edit'])->name('admin.projects.edit');
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy');

    // Category management overrides
    Route::get('/categories', [CategoryController::class, 'index'])->name('admin.categories.index');
    Route::post('/categories', [CategoryController::class, 'store'])->name('admin.categories.store');
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('admin.categories.destroy');

    // Skill matrix updates
    Route::get('/skills/create', [SkillController::class, 'create'])->name('admin.skills.create');
    Route::post('/skills', [SkillController::class, 'store'])->name('admin.skills.store');
    Route::delete('/skills/{id}', [SkillController::class, 'destroy'])->name('admin.skills.destroy');

    // Legacy global configurations toggle
    Route::get('/settings', [AdminSettingController::class, 'index'])->name('admin.settings.index');
    Route::put('/settings/video', [AdminSettingController::class, 'updateVideo'])->name('admin.settings.video.update');
});

/*
|--------------------------------------------------------------------------
| 🧪 Parallel Breeze Inertia Layout Group & Secure Gate Matrix
|--------------------------------------------------------------------------
| This block communicates natively with your single-page React forms.
*/
Route::middleware(['auth', 'verified'])->group(function () {

    // 1. Inertia Dashboard Control Deck Layout
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'categories' => Category::with('skills')->get(),
            'projects' => Project::all(),
        ]);
    })->name('dashboard');

    // 2. 🔒 Secure Action Targets protected cleanly by your AppServiceProvider Gate
    Route::prefix('breeze-admin')->middleware('can:manage-portfolio')->group(function () {
        // Form Insert Methods
        Route::post('/projects', [ProjectController::class, 'store'])->name('breeze.projects.store');
        Route::post('/categories', [CategoryController::class, 'store'])->name('breeze.categories.store');
        Route::post('/skills', [SkillController::class, 'store'])->name('breeze.skills.store');

        // ⚡ RESOLVED ACTION: Now securely wrapped inside your 'manage-portfolio' Gate validation check!
        Route::put('/projects/{id}', [ProjectController::class, 'update'])->name('admin.projects.update');

        // Video Parameter Mutator Engine
        Route::put('/settings/video', [AdminSettingController::class, 'updateVideo'])->name('breeze.settings.video.update');
    });
});

/*
|--------------------------------------------------------------------------
| ✅ ChatBot API Route
|--------------------------------------------------------------------------
*/
Route::post('/portfolio-chat', [ProjectChatController::class, 'chat'])->name('portfolio.chat');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

/*
|--------------------------------------------------------------------------
| 🔑 Breeze Auth Authentication Engine
|--------------------------------------------------------------------------
*/
require __DIR__ . '/auth.php';
