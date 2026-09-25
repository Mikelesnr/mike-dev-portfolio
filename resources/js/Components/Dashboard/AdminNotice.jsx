import React from "react";

export default function AdminNotice({ userName }) {
    return (
        <div className="admin-notice" role="alert">
            <div className="admin-notice-icon" aria-hidden="true">
                ⚠
            </div>
            <div>
                <h3 className="admin-notice-title">
                    System Notice: Standard Mode
                </h3>
                <p className="admin-notice-text">
                    Logged in as {userName || "Guest"}. You must be flagged as
                    an administrator to save updates.
                </p>
            </div>
        </div>
    );
}