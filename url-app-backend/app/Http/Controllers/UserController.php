<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use stdClass;
use function Laravel\Prompts\error;


class UserController extends Controller
{
    public function getUser(){
    return DB::table('users')
        ->select('*')
        ->get();
}

    static function createHash($userResource) {
        $string = $userResource->name.$userResource->last_name.$userResource->email.$userResource->phone.$userResource->image_url;
        return hash('md5', $string, false);
    }
    public function createUser(Request $request){
        $userForHash = new stdClass();
        $userForHash->name = $request->name;
        $userForHash->last_name = $request->last_name;
        $userForHash->email = $request->email;
        $userForHash->phone = $request->phone;
        $userForHash->image_url = $request->image_url;

        $hash = self::createHash($userForHash);

        $user = DB::table('users')
            ->select('hash')
            ->where('hash', '=', $hash)
            ->first();

        if(!$user) {
            $userInput = [
                'name' => $request->name,
                "last_name" => $request->last_name,
                "email" => $request->email,
                "phone" => $request->phone,
                "image_url" => $request->image_url,
                "hash" => $hash
            ];
            User::create($userInput);
            return response([
                'message' => 'User created',
            ], 201);
        }

        return response([
            'message' => 'User already exist',
        ], 208);
    }
}
