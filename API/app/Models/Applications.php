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
        'universitas',
        'jurusan',
        'alasan'
    ];

    public $timestamps = false;
}
