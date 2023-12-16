<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
class PostController extends Controller
{



    // {
    //     "post_id": 1,
    //     "user_id": 1,
    //     "content": "Sample post content",
    //     "media_url": "https://example.com/media/sample.jpg",
    //     "created_at": "2023-12-16T02:25:12.000000Z",
    //     "updated_at": "2023-12-16T02:25:12.000000Z",
    //     "username": "johnuser"

    // }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $posts = Post::with('user:user_id,username')->get();

            return response()->json([
                'posts' => $posts
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!'
            ], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // try {
        //     $validatedData = $request->validate([
        //         'name' => 'required|string',
        //         'description' => 'required|string',
        //         'image' => 'required|string', // Expecting image as a base64 encoded string
        //     ]);

        //     // Decode base64 image data to a file
        //     $imageData = $validatedData['image'];
        //     $imageData = str_replace('data:image/jpeg;base64,', '', $imageData); // Adjust if different image types are expected
        //     $imageData = str_replace(' ', '+', $imageData);
        //     $image = base64_decode($imageData);

        //     $imageName = Str::random(32) . '.jpeg'; // Always assuming jpeg for simplicity

        //     // Save image to storage
        //     Storage::disk('public')->put($imageName, $image);

        //     // Create the post
        //     Post::create([
        //         'name' => $validatedData['name'],
        //         'image' => $imageName,
        //         'description' => $validatedData['description']
        //     ]);

        //     return response()->json([
        //         'message' => 'Product successfully created.'
        //     ], 200);
        // } catch (\Exception $e) {
        //     return response()->json([
        //         'message' => 'Something went really wrong!'
        //     ], 500);
        // }
    }



    /**
     * Display the specified resource.
     */

     public function show(Post $post)
     {
         $postWithUser = Post::with('user')->find($post->post_id);

         if (!$postWithUser) {
             return response()->json([
                 'message' => 'Post Not Found.'
             ], 404);
         }

         $userName = $postWithUser->user->name;

         return response()->json([
             'post' => [
                 'post_id' => $postWithUser->post_id,
                 'content' => $postWithUser->content,
                 'media_url' => $postWithUser->media_url,
                 'user_name' => $userName
             ]
         ], 200);
     }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post){
    // try {
        // Find post
        // $post = Post::find($id);
        // if (!$post) {
        //     return response()->json([
        //         'message' => 'Post Not Found.'
        //     ], 404);
        // }

        // $post->content = $request->input('content');

        // if ($request->hasFile('image')) {
        //     $storage = Storage::disk('public');

        //     // Old image deletion
        //     if ($storage->exists($post->media_url)) {
        //         $storage->delete($post->media_url);
        //     }

        //     $imageName = Str::random(32) . "." . $request->file('image')->getClientOriginalExtension();
        //     $post->media_url = $imageName;

        //     // Save the new image to the storage
        //     $storage->put($imageName, file_get_contents($request->file('image')));
        // }

        // Update the post
        // $post->save();

        // return response()->json([
        //     'message' => 'Post successfully updated.'
        // ], 200);
        // } catch (\Exception $e) {
        //     return response()->json([
        //         'message' => 'Something went wrong!'
        //     ], 500);
        // }
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        try {
            // Find the post
            $foundPost = Post::find($post->post_id);

            if (!$foundPost) {
                return response()->json([
                    'message' => 'Post Not Found.'
                ], 404);
            }

            $foundPost->comments()->delete();
            $foundPost->reports()->delete();
            $foundPost->analytics()->delete();

            $foundPost->delete();

            return response()->json([
                'message' => 'Post successfully deleted.'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong!'
            ], 500);
        }
    }
}
