<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;



class AuthController extends Controller
{
    public function sign_up(Request $request){
        $data = $request->validate([
            'name' => 'required|string',
            'username' => 'required|string|unique:users',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string',
        ]);
        $user = User::create([
            'role_id'=> 1,
            'name' => $data['name'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password_hash' => bcrypt($data['password']),
        ]);
        $token = $user->createToken('apiToken')->plainTextToken;

            $res = [
                'user' => $user,
                'token' => $token
            ];
            return response()->json($res, 201);
    }

    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');
        
        $user = User::where('email', $email)->first();
        
        if ($user && Hash::check($password, $user->password_hash)) {
            $token = $user->createToken('sanctum-token')->plainTextToken;
        
            $res = [
                'user' => $user,
                'token' => $token
            ];
            return response()->json($res, 201);
        } else {
            return response()->json("Your provided credentials do not match in our records.");
        }
        

    }

    public function logout()
    {
        if (auth()->user()) {
            Auth::logout();
            auth()->user()->tokens()->delete();
            return [
                'message' => 'user logged out'
            ];
        } else {
            return [
                'message' => 'User is not logged in'
            ];
        }
    }
}
