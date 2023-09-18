<?php

namespace App\Http\Controllers;

use Aws\S3\S3Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;
use function Laravel\Prompts\error;

class ImagesController extends Controller
{
    protected S3Client $s3Client;
    public function __construct()
    {
        $this->s3Client = new S3Client([
            'region' => env('AWS_DEFAULT_REGION'),
            'version' => '2006-03-01',
            'endpoint' => 'http://localhost:4566'
        ]);
    }

    public function uploadFile(Request $request){
        self::createBucketIfNotExist();
        $imageExtensions = array('jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg');
        $file = $request->file('image');
        $fileExtension = $request->file('image')->getClientOriginalExtension();

        if (in_array($fileExtension, $imageExtensions)) {

            $uploadRespnse = $this->s3Client->putObject([
                'Bucket' => env('AWS_BUCKET'),
                'Key'    => $file->getFilename().'.'.$fileExtension,
                'ACL'    => 'public-read',
                'SourceFile' => $file->path()
            ]);
            return response([
                'uri' =>$uploadRespnse['@metadata']["effectiveUri"]
            ], 201);
        }
        return response([
            'message' => 'File is not an image',
        ], 401);
    }

    public function createBucketIfNotExist(){



        $exist = $this->s3Client->doesBucketExist(env('AWS_BUCKET'));
        if(!$exist){
            $this->s3Client->createBucket([
                'Bucket' => env('AWS_BUCKET'),
            ]);
        }
    }
}
