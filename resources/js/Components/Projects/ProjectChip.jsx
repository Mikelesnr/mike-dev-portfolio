import React from "react";

/**
 * ProjectChip — a clickable chip that represents a *project*,
 * pointing the visitor at /work.
 *
 * Used on the Skills section, under each skill, to show which
 * real builds actually used that skill.
 */
export default function ProjectChip({ project }) {
    return (
        <a
            href="/work"
            className="chip chip--project"
            title={`View ${project.name} on the Work page`}
        >
            {project.name}
        </a>
    );
}