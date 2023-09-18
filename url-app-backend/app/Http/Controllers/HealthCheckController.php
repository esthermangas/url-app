<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class HealthCheckController extends Controller
{
    public function __invoke()
    {
        $databaseName = DB::connection()->getDatabaseName();
        return [
            'api' => 'running',
            'database' => isset($databaseName) ? "running" : "error",
        ];
    }
}
