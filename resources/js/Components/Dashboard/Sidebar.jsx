import React from "react";

const TABS = [
    { id: "projects", label: "Projects Portfolio", icon: "📁" },
    { id: "skills", label: "Skill Metrics", icon: "🛠️" },
    { id: "customers", label: "Customers", icon: "🤝" },
    { id: "settings", label: "Media & Video", icon: "📺" },
];

export default function Sidebar({ activeTab, setActiveTab }) {
    return (
        <nav className="dashboard-sidebar">
            <h3 className="dashboard-sidebar-heading">Concerns</h3>
            <ul className="dashboard-sidebar-list">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <li key={tab.id}>
                            <button
                                type="button"
                                onClick={() => setActiveTab(tab.id)}
                                className={`dashboard-sidebar-btn ${isActive ? "is-active" : ""
                                    }`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                <span
                                    className="dashboard-sidebar-icon"
                                    aria-hidden="true"
                                >
                                    {tab.icon}
                                </span>
                                <span>{tab.label}</span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}