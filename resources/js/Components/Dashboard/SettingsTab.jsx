import React from "react";

export default function SettingsTab({
    videoForm,
    handleUpdateVideo,
    panelStyles,
}) {
    return (
        <div>
            <header className="dash-tab-header">
                <h2 className="dash-tab-title">
                    Media Architecture Toggles
                </h2>
                <p className="dash-tab-sub">
                    Change dynamic runtime keys loaded within your app
                    infrastructure layouts.
                </p>
            </header>

            <form onSubmit={handleUpdateVideo} className="dash-form">
                <div className="dash-field">
                    <h3 className="dash-form-title">
                        Change Introduction Video Stream
                    </h3>
                    <p className="dash-form-sub">
                        Paste any standard YouTube link below to immediately
                        swap out the video element assets on your homepage.
                    </p>
                    <label className="dash-label">
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