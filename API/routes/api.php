<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\UniversityController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/v1/auth/login', [AuthController::class, 'login']);
Route::post('/v1/auth/register', [AuthController::class, 'register']);
Route::post('/v1/auth/logout', [AuthController::class, 'logout']);
Route::post('/v1/auth/check_login', [AuthController::class, 'checkToken']);

Route::get('/v1/random_university', [UniversityController::class, 'getRandomUniversity']);
Route::post('/v1/register_university', [UniversityController::class, 'registerUniversity']);
Route::get('/v1/get_majors_by_university', [UniversityController::class, 'getMajorsByUniversity']);
Route::get('/v1/search_university', [UniversityController::class, 'searchUniversity']);
Route::get('/v1/search_major', [UniversityController::class, 'searchMajor']);

Route::get('/v1/get_notifications', [NotificationsController::class, 'getNotifications']);
Route::get('/v1/get_filtered_notifications', [NotificationsController::class, 'filteredNotifications']);
Route::get('/v1/read_notification', [NotificationsController::class, 'readNotification']);
