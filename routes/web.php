<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/work', function () {
    return Inertia::render('Work');
});

Route::get('/contact', function () {
    return Inertia::render('Contact');
});