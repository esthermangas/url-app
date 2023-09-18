<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HealthCheckController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ImagesController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/health', HealthCheckController::class);
Route::post('/create_user', [UserController::class, 'createUser']);
Route::post('/upload_file', [ImagesController::class, 'uploadFile']);
Route::get('/check_bucket', [ImagesController::class, 'createBucketIfNotExist']);
