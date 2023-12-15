<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); 
            $table->foreignId('role_id')->constrained();
            $table->string('name');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('password_hash');
            $table->string('profile_image_url')->nullable();
            $table->text('bio')->nullable();
            $table->enum('privacy_setting', ['Public', 'Private'])->default('Public');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('users');
    }
}
