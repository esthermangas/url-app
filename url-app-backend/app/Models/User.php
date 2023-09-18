<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;


class User extends Model
{
    protected $table = 'users';
    public $timestamps = true;


    protected $fillable = [
        'name',
        'last_name',
        'email',
        'phone',
        'image_url',
        'hash'
    ];

}
