<?php

namespace App\Http\Controllers;

use App\Models\Users;
use App\Models\Applications;
use Illuminate\Http\Request;

class NotificationsController extends Controller
{
    public function getNotifications(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required',
        ]);

        $user = Users::where('token', $request['token'])->first();

        $notifications = Applications::where('user_id', $user->id)->get();

        return response()->json($notifications);
    }

    public function filteredNotifications(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required',
        ]);

        $user = Users::where('token', $request['token'])->first();

        $notifications = Applications::where('user_id', $user->id)->get();

        $filteredNotifications = $notifications->filter(function ($notification) {
            return $notification->notified != 1;
        });

        return response()->json($filteredNotifications);
    }

    public function readNotification(Request $request)
    {
        $validation = $request->validate([
            'token' => 'required',
        ]);

        $userId = Users::where('token', $request['token'])->first()->id;

        $notifications = Applications::where('user_id', $userId)->get();
        foreach ($notifications as $notification) {
            $notification->notified = 1;
            $notification->save();
        }

        return response()->json($notifications);
    }
}
