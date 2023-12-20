<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $primaryKey = 'comment_id';
    protected $fillable = [
        'post_id',
        'user_id',
        'comment_text',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id'); // Ensure 'user_id' matches your foreign key
    }

    public function post()
    {
        return $this->belongsTo(Post::class, 'post_id');
    }

}
