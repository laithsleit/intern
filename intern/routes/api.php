<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AnalyticController;



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


/////////////////////////comment//////////////////////////////////////////
Route::resource('comments', CommentController::class);
////////////////////////////////////////////////////////////////////////////////////////

Route::post('/signup', [AuthController::class, 'sign_up']);
Route::post('login', [AuthController::class,'login']);
Route::post('/logout', [AuthController::class, 'logout']);

/////////////////////////Analytics///////////////////////////////////////////////////
Route::resource('analytics', AnalyticController::class);
Route::get('analytics/post/{post_id}', [AnalyticController::class, 'getAnalyticsForPost']);
Route::put('analytics/{post_id}/update-likes-comments', [AnalyticController::class, 'updateLikesAndComments']);
////////////////////////////////////////////////////////////////////////////////////////



