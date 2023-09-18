<?php


namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'name' => $request->name,
            "last_name" => $request->last_name,
            "email" => $request->email,
            "phone" => $request->phone,
            "image_url" => $request->image_url
        ];
    }
}
