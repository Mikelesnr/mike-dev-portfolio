import React, { useState } from "react";

export default function ProjectCard({ project, onPreview }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);

    const isLive = Boolean(project.url);
    const hasManySkills = project.skills?.length > 4;

    return (
        <div className="info project-info">
            <div className="project-badges">
                <span className="project-status">
                    <span className="project-status-dot"></span>
                    {isLive ? "Live" : "In development"}
                </span>
                <span
                    className={`project-type-badge ${project.is_hobby ? "project-type-hobby" : "project-type-client"}`}
                >
                    {project.is_hobby ? "Hobby Project" : "Professional Build"}
                </span>
            </div>

            <h3 className="body-h3">{project.name}</h3>

            {project.is_hobby && (
                <p className="project-hobby-note">
                    Personal project, not commissioned work — free to explore.
                </p>
            )}

            {project.customers?.length > 0 && (
                <p className="project-client">
                    Built for {project.customers.map((c) => c.name).join(", ")}
                </p>
            )}

            {/* The clickable description area */}
            <p
                className={`body-p ${isExpanded ? "" : "body-p-truncated"} clickable-text`}
                onClick={() => setIsExpanded(!isExpanded)}
                title="Click to expand description"
            >
                {project.description}
                {!isExpanded && (
                    <span className="text-xs text-gray-500">
                        ... (read more)
                    </span>
                )}
            </p>

            <p className="project-techstack">{project.techstack}</p>

            {/* Expanded Skills Section */}
            {project.skills?.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                    <div
                        className={`skill-card-projects ${isSkillsExpanded ? "skill-list-expanded" : "skill-list-clamped"}`}
                    >
                        {project.skills.map((skill) => (
                            <span
                                key={skill.id}
                                className="project-chip"
                                style={{ pointerEvents: "none" }}
                            >
                                {skill.name}
                            </span>
                        ))}
                    </div>

                    {/* Toggle Button for Skills */}
                    {hasManySkills && (
                        <button
                            onClick={() =>
                                setIsSkillsExpanded(!isSkillsExpanded)
                            }
                            className="text-[10px] text-gray-500 hover:text-brass mt-1 cursor-pointer"
                        >
                            {isSkillsExpanded
                                ? "Show fewer"
                                : "Show all skills"}
                        </button>
                    )}
                </div>
            )}

            <div className="project-card-actions">
                <button
                    type="button"
                    className="btn-launch"
                    onClick={() => onPreview(project)}
                >
                    {isLive ? "Launch Preview" : "View Details"}
                </button>
                {isLive && (
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-source"
                    >
                        Open in New Tab
                    </a>
                )}
            </div>
        </div>
    );
}
