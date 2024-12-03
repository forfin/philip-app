<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $user = User::create([
            'email' => $request->email,
            'name' => $request->name,
            'tel' => $request->tel,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 200);
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = User::where('email', $email)
            ->first();

        if (!$user || !Hash::check($password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $payload = [
            'id' => $user->id,
            'email' => $user->email,
            'role' => $user->role,
            'name' => $user->name,
            'exp' => now()->addHours(25)->timestamp,
        ];

        try {

            $token = JWTAuth::claims($payload)->attempt($request->only('email', 'password'));
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token'], 500);
        }

        return response()->json([
            'token' => $token,
            'user' => $user,
        ]);
    }
}
