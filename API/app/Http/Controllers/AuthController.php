<?php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'nama' => 'required',
            'email' => 'required',
            'password' => 'required',
            'tanggal_lahir' => 'required',
            'gender' => 'required',
            'alamat' => 'required',
            'nomor_telepon' => 'required',
            'pendidikan' => 'required',
            'bukti' => 'required',
            'jurusan' => 'required',
        ]);

        $existUser = Users::where('email', $data['email'])->first();
        if ($existUser) {
            return response()->json([
                'message' => 'User already exist'
            ], 409);
        }

        $user = Users::create($data);
        if (!$user) {
            return response()->json([
                'message' => 'Register failed'
            ], 401);
        }

        return response()->json([
            'message' => 'Register success',
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required',
        ]);

        $user = Users::where('email', $request->email)->first();
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        if ($user['password'] != $request->password) {
            return response()->json([
                'message' => 'Wrong password'
            ], 401);
        }

        $token = md5($user['email'] . $user['password']);
        $loginToken = Users::where('email', $request->email)->update(['token' => $token]);

        return response()->json([
            'nama' => $user['nama'],
            'email' => $user['email'],
            'tanggal_lahir' => $user['tanggal_lahir'],
            'gender' => $user['gender'],
            'alamat' => $user['alamat'],
            'nomor_telepon' => $user['nomor_telepon'],
            'pendidikan' => $user['pendidikan'],
            'bukti' => $user['bukti'],
            'jurusan' => $user['jurusan'],
            'token' => $token,
            'message' => 'Login success',
        ]);
    }

    public function logout(Request $request)
    {
        if (!$request->filled('token')) {
            return response()->json([
                'message' => 'unauthorized user'
            ], 401);
        }

        $logout = Users::where('token', $request->token)->update(['token' => null]);
        if (!$logout) {
            return response()->json([
                'message' => 'Logout failed'
            ], 401);
        }

        return response()->json([
            'message' => 'Logout success',
        ]);
    }

    public function checkToken(Request $request)
    {
        if (!$request->filled('token')) {
            return response()->json([
                'message' => 'unauthorized user'
            ], 401);
        }

        $token = Users::where('token', $request->token)->first();
        if (!$token) {
            return response()->json([
                'message' => 'unauthorized user'
            ], 401);
        }

        return response()->json([
            'message' => 'Authorized user',
        ], 200);
    }
}
