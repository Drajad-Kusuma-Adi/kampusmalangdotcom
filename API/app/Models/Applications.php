<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applications extends Model
{
    use HasFactory;

    protected $table = 'applications';

    protected $fillable = [
        'nama',
        'user_id',
        'universitas',
        'jurusan',
        'alasan',
        'datetime'
    ];

    public $timestamps = false;
}
