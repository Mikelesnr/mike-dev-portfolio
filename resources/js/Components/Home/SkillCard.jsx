import React from "react";
import ProjectChip from "./ProjectChip";

export default function SkillCard({ skill }) {
    const projects = skill.projects ?? [];

    return (
        <div className="skill-card">
            <span className="skill-card-name">{skill.name}</span>
            <div className="skill-card-projects">
                {projects.length > 0 ? (
                    projects.map((project) => (
                        <ProjectChip key={project.id} project={project} />
                    ))
                ) : (
                    <span className="skill-card-empty">
                        used across current builds
                    </span>
                )}
            </div>
        </div>
    );
}
