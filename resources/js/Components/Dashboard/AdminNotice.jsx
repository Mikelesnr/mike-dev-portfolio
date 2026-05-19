import React from "react";

export default function AdminNotice({ userName }) {
    return (
        <div className="bg-red-900/40 text-red-200 p-6 rounded-lg border border-red-500 mb-6">
            <h3 className="font-bold">System Notice: Standard Mode</h3>
            <p className="text-sm mt-1">
                Logged in as {userName || "Guest"}. You must be flagged as an
                administrator to save updates.
            </p>
        </div>
    );
}
