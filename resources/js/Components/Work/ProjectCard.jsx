import React from "react";

export default function ProjectCard({ project, onPreview }) {
    const isLive = Boolean(project.url);

    return (
        <div className="info project-info">
            <span className="project-status">
                <span className="project-status-dot"></span>
                {isLive ? "Live" : "In development"}
            </span>

            <h3 className="body-h3">{project.name}</h3>
            <p className="body-p">{project.description}</p>
            <p className="project-techstack">{project.techstack}</p>

            {project.skills?.length > 0 && (
                <div className="skill-card-projects" style={{ marginTop: "10px" }}>
                    {project.skills.map((skill) => (
                        <span key={skill.id} className="project-chip" style={{ pointerEvents: "none" }}>
                            {skill.name}
                        </span>
                    ))}
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
