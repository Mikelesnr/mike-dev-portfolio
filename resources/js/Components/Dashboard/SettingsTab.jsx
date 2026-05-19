import React from "react";

export default function SettingsTab({
    videoForm,
    handleUpdateVideo,
    panelStyles,
}) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">
                Media Architecture Toggles
            </h2>
            <p className="text-sm text-gray-400 mb-6">
                Change dynamic runtime keys loaded within your app
                infrastructure layouts.
            </p>

            <form
                onSubmit={handleUpdateVideo}
                className="bg-black/20 p-6 rounded-xl border border-gray-800 space-y-4"
            >
                <div>
                    <h3 className="text-md font-bold text-white">
                        Change Introduction Video Stream
                    </h3>
                    <p className="text-xs text-gray-400 mt-1 mb-4">
                        Paste any standard YouTube link below to immediately
                        swap out the video element assets on your homepage.
                    </p>
                    <label className="text-xs font-bold uppercase tracking-wider">
                        Active Stream Engine Target URL:
                    </label>
                    <input
                        type="url"
                        style={panelStyles.inputField}
                        placeholder="e.g. https://www.youtube.com/watch?v=..."
                        required
                        value={videoForm.data.video_url}
                        onChange={(e) =>
                            videoForm.setData("video_url", e.target.value)
                        }
                    />
                </div>
                <button
                    type="submit"
                    style={panelStyles.primaryBtn}
                    disabled={videoForm.processing}
                >
                    {videoForm.processing
                        ? "Persisting to Storage..."
                        : "Update Video Stream"}
                </button>
            </form>
        </div>
    );
}
