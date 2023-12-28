<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Models\Majors;
use App\Models\Applications;
use App\Models\Universities;
use Illuminate\Http\Request;

class UniversityController extends Controller
{
    public function getRandomUniversity(Request $request)
    {
        if (!$request->filled('token')) {
            return response()->json([
                'message' => 'unauthorized user'
            ], 401);
        }
        $loginCheck = Users::where('token', $request->token)->first();
        if (!$loginCheck) {
            return response()->json([
                'message' => 'unauthorized user'
            ], 401);
        }

        $university = Universities::inRandomOrder()->limit(3)->get();
        if (!$university) {
            return response()->json([
                'message' => 'error at get university'
            ], 404);
        }

        return response()->json($university);
    }

    public function registerUniversity(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required',
            'university_id' => 'required',
            'major_id' => 'required',
            'appeal' => 'required'
        ]);
        $applicant = Users::where('token', $request->token)->first();
        if (!$applicant) {
            return response()->json([
                'message' => 'unauthorized user'
            ], 401);
        }

        $apply_id = $applicant->id;
        $university_id = $request->university_id;
        $major_id = $request->major_id;
        $appeal = $request->appeal;

        $name = Users::where('id', $apply_id)->first()->nama;
        $university = Universities::where('id', $university_id)->first()->nama;
        $major = Majors::where('id', $major_id)->first()->nama;

        if (!$name || !$university || !$major) {
            return response()->json([
                'message' => 'data not found'
            ], 404);
        }

        $register = Applications::create([
            'nama' => $name,
            'universitas' => $university,
            'jurusan' => $major,
            'alasan' => $appeal,
        ]);

        if (!$register) {
            return response()->json([
                'message' => 'error at register'
            ], 404);
        }

        return response()->json([
            'message' => 'success'
        ]);
    }

    public function getMajorsByUniversity(Request $request)
    {
        $validation = $request->validate([
            'university_id' => 'required'
        ]);
        $majors = Majors::where('university_id', $request->university_id)->get();
        if (!$majors) {
            return response()->json([
                'message' => 'data not found'
            ], 404);
        }
        return response()->json($majors);
    }

    public function searchUniversity(Request $request)
    {
        $validation = $request->validate([
            'query' => 'required',
        ]);
        return response()->json($request->query);
        // $universities = Universities::where('nama', 'like', '%' . $request->query . '%')->get();
        // return response()->json($universities);
    }
}
