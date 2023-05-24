<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Controllers imports

use App\Http\Controllers\ProductoController;
use App\Http\Controllers\WebController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('productos', ProductoController::class);

Route::prefix('public')->group(function() {
    Route::get('/productos' ,      [WebController::class, 'index'] );
    Route::get('/productos/{id}' , [WebController::class, 'details'] );
});