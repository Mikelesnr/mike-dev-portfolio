<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

class AdminSettingController extends Controller
{
    /**
     * Update the portfolio featured intro video.
     */
    public function updateVideo(Request $request)
    {
        $request->validate([
            'video_url' => 'required|url',
        ]);

        $url = $request->input('video_url');

        // Helper logic to convert standard YouTube links into embed links automatically
        if (preg_match('/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/', $url, $matches)) {
            $youtubeId = $matches[1];
            $url = "https://www.youtube.com/embed/" . $youtubeId;
        }

        Setting::updateOrCreate(
            ['key' => 'intro_video_url'],
            ['value' => $url]
        );

        return redirect()->back()->with('success', 'Introduction video updated successfully!');
    }
}
