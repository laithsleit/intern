<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // Check if 'post_id' is present in the request
        if ($request->has('post_id')) {
            // Fetch comments for the specified post
            $postId = $request->input('post_id');
            $comments = Comment::where('post_id', $postId)->get();
        } else {
            // If 'post_id' is not provided, return all comments
            $comments = Comment::all();
        }

        return response()->json(['comments' => $comments]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $comment = new Comment;
        $comment->post_id = $request->post_id;
        $comment->user_id = $request->user_id; // If user authentication is required
        $comment->comment_text = $request->comment_text;
        $comment->save();
        return response()->json(['message' => 'Comment added successfully!', 'comment' => $comment]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        return response()->json($comment);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'comment_text' => 'sometimes|string',
        ]);

        $comment->update($validatedData);
        return response()->json($comment);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json(null, 204);
    }

    public function showCommentsByPost($post_id)
    {
        $comments = Comment::where('post_id', $post_id)->get();

        if ($comments->isEmpty()) {
            return response()->json(['message' => 'No comments found for this post'], 404);
        }

        return response()->json(['comments' => $comments]);
    }
}
