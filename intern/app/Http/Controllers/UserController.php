<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }


public function store(Request $request)
{
    // Create a new user instance
    $user = new User;

    // Assign values from the request to the user object.
    // No validation is performed here.
    $user->role_id = $request->role_id;
    $user->name = $request->name;
    $user->username = $request->username;
    $user->email = $request->email;
    $user->bio = $request->bio;
    $user->privacy_setting = $request->privacy_setting;

    // Hash the password and set it on the user object
    $user->password = Hash::make($request->password);

    // Save the user to the database
    $user->save();

    // Handle profile image upload if present
    if ($request->hasFile('profile_image')) {
        $imagePath = $request->file('profile_image')->store('user/profile_images', 'public');
        $user->profile_image_url = $imagePath;
        $user->save();
    }

    // Return the created user as a JSON response
    return response()->json($user, 201);
}



    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'sometimes|string|max:255',
            'username' => 'sometimes|string|max:255|unique:users,username,' . $id . ',user_id',
            'email' => 'sometimes|string|email|max:255|unique:users,email,' . $id . ',user_id',
            'password' => 'sometimes|string|min:6',
            'bio' => 'nullable|string',
            'privacy_setting' => ['sometimes', Rule::in(['Public', 'Private'])],
        ]);

        if (array_key_exists('password', $validatedData)) {
            $user->password_hash = Hash::make($validatedData['password']);
        }

        if ($request->hasFile('profile_image')) {
            // Delete old image if it exists
            if ($user->profile_image_url) {
                Storage::delete($user->profile_image_url);
            }
            $user->profile_image_url = $request->file('profile_image')->store('user/profile_images', 'public');
        }

        $user->fill($validatedData)->save();

        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }


}
