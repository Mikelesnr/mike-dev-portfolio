import React from "react";

export default function CustomerCard({ customer }) {
    const initial = customer.name?.charAt(0)?.toUpperCase() ?? "?";
    const linkedProject = customer.projects?.[0];

    return (
        <div className="customer-card">
            {customer.logo_url ? (
                <img
                    src={customer.logo_url}
                    alt={`${customer.name} logo`}
                    className="customer-logo"
                />
            ) : (
                <div className="customer-logo customer-logo-fallback">
                    {initial}
                </div>
            )}
            <span className="customer-name">{customer.name}</span>
            {linkedProject && (
                <a href="/work" className="project-chip">
                    {linkedProject.name}
                </a>
            )}
        </div>
    );
}
