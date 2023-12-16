<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Friend_Request extends Model
{
    use HasFactory;
    protected $table = 'friend_requests';

    protected $primaryKey = 'friend_request_id';
    protected $fillable = [
        'sender_id',
        'receiver_id',
        'status',
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }
}
