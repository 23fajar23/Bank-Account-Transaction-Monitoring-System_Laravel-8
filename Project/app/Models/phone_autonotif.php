<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class phone_autonotif extends Model
{
    use HasFactory;
    protected $fillable = [
        'uid',
        'referal_autonotif',
        'phone'
    ];
}
