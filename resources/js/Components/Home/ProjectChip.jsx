import React from "react";

/**
 * A single "used on" tag shown under a skill, pointing at a real
 * project. Clicking it takes the visitor straight to /work.
 */
export default function ProjectChip({ project }) {
    return (
        <a href="/work" className="project-chip" title={`View ${project.name} on the Work page`}>
            {project.name}
        </a>
    );
}
