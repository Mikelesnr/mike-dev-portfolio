import React from "react";

export default function Sidebar({ activeTab, setActiveTab }) {
    const sidebarLink = (isActive) => ({
        display: "block",
        width: "100%",
        textAlign: "left",
        padding: "12px 20px",
        borderRadius: "8px",
        marginBottom: "8px",
        fontWeight: "bold",
        fontSize: "14px",
        transition: "all 0.3s ease",
        backgroundColor: isActive ? "#d9ee60" : "transparent", // var(--btn-primary)
        color: isActive ? "#0b1b18" : "#b6c9b6",
    });

    return (
        <div className="w-full md:w-1/4 p-4 bg-black/30 rounded-xl border border-emerald-950/20 h-fit">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-3 mb-4">
                Concerns
            </h3>
            <button
                onClick={() => setActiveTab("projects")}
                style={sidebarLink(activeTab === "projects")}
            >
                📁 Projects Portfolio
            </button>
            <button
                onClick={() => setActiveTab("skills")}
                style={sidebarLink(activeTab === "skills")}
            >
                🛠️ Skill Metrics
            </button>
            <button
                onClick={() => setActiveTab("settings")}
                style={sidebarLink(activeTab === "settings")}
            >
                📺 Media & Video Settings
            </button>
        </div>
    );
}
