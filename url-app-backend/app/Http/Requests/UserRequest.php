<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'name' => 'string',
            'last_name' => 'string',
            'phone' => 'string',
            'email' => 'string',
            'image_url' => 'string'
        ];
    }
}
