import React from "react";

/**
 * ValueCard — a single "why work with me" card.
 *
 * Props:
 *   - title: string
 *   - description: string
 *   - index: number (optional) — 1-based. Renders as "01", "02", etc.
 *            in the corner. Omit to hide the number.
 */
export default function ValueCard({ title, description, index }) {
    return (
        <div className="value-card">
            {typeof index === "number" && (
                <span className="value-card-index" aria-hidden="true">
                    {String(index).padStart(2, "0")}
                </span>
            )}
            <h3>{title}</h3>
            <p className="body-p">{description}</p>
        </div>
    );
}