<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
    use HasFactory;

    protected $table = 'users';

    protected $fillable = [
        'nama',
        'email',
        'password',
        'tanggal_lahir',
        'gender',
        'alamat',
        'nomor_telepon',
        'pendidikan',
        'bukti',
        'jurusan',
    ];

    public $timestamps = false;
}
