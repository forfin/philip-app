<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;

Route::get('/web/{any}', function () {
    return view('app');
})->where('any', '.*');

// Authentication Routes
Route::post('/api/register', [AuthController::class, 'register']);
Route::post('/api/login', [AuthController::class, 'login']);

// Product Routes
Route::post('/api/productStore', [ProductController::class, 'store']); // Create Product
Route::put('/api/productStore/{id}', [ProductController::class, 'store']); // Update Product

Route::get('/api/products', [ProductController::class, 'index']); // Add Product
// Fetch product details by ID
Route::get('/api/products/{id}', [ProductController::class, 'show']);
// Route for deleting a product
Route::delete('/api/products/{id}', [ProductController::class, 'delete']);
Route::post('/api/import-csv', [ProductController::class, 'importCSV']);
