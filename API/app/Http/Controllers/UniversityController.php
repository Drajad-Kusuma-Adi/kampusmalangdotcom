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
            'appeal' => 'required',
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
        $user_id = Users::where('id', $apply_id)->first()->id;
        $university = Universities::where('id', $university_id)->first()->nama;
        $major = Majors::where('id', $major_id)->first()->nama;

        if (!$name || !$university || !$major) {
            return response()->json([
                'message' => 'data not found'
            ], 404);
        }

        $application = Applications::where('nama', $name)->where('universitas', $university)->first();
        if ($application) {
            return response()->json([
                'message' => 'application already exist'
            ], 409);
        }

        $register = Applications::create([
            'nama' => $name,
            'user_id' => $user_id,
            'universitas' => $university,
            'jurusan' => $major,
            'alasan' => $appeal,
            'datetime' => date('Y-m-d H:i:s'),
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
        $universities = Universities::where('nama', 'LIKE', '%' . $request->query->get('query') . '%')->get();
        return response()->json($universities);
    }

    public function searchMajor(Request $request)
    {
        $validation = $request->validate([
            'query' => 'required',
        ]);
        $majors = Majors::where('nama', 'LIKE', '%' . $request->query->get('query') . '%')->get();

        $universities = [];

        foreach ($majors as $major) {
            $university = Universities::where('id', $major->university_id)->first();
            if (!in_array($university, $universities)) {
                array_push($universities, $university);
            }
        }

        return response()->json($universities);
    }
}
