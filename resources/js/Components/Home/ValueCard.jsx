import React from "react";

export default function ValueCard({ title, description }) {
    return (
        <div className="value-card">
            <h3>{title}</h3>
            <p className="body-p">{description}</p>
        </div>
    );
}
