import React, { useEffect, useRef } from "react";

export default function ProjectDetailModal({ project, onClose }) {
    const closeBtnRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        closeBtnRef.current?.focus();

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = prevOverflow;
        };
    }, [onClose]);

    if (!project) return null;

    const isLive = Boolean(project.url);

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="project-modal-overlay"
            onMouseDown={handleOverlayClick}
        >
            <div
                className="project-modal project-detail-modal"
                role="dialog"
                aria-modal="true"
                aria-label={`${project.name} details`}
            >
                <div className="project-modal-header">
                    <div className="project-modal-title">
                        <strong>{project.name}</strong>
                        {project.is_hobby ? (
                            <span className="project-type-badge project-type-hobby">
                                Hobby Project
                            </span>
                        ) : (
                            <span className="project-type-badge project-type-client">
                                Professional Build
                            </span>
                        )}
                    </div>
                    <button
                        ref={closeBtnRef}
                        type="button"
                        className="project-modal-close"
                        onClick={onClose}
                        aria-label="Close details"
                    >
                        ×
                    </button>
                </div>

                <div className="project-modal-body project-detail-body">
                    {/* Meta row */}
                    <div className="project-detail-meta">
                        {project.customers?.length > 0 && (
                            <div className="project-detail-meta-item">
                                <span className="project-detail-meta-label">
                                    Built for
                                </span>
                                <span className="project-detail-meta-value">
                                    {project.customers
                                        .map((c) => c.name)
                                        .join(", ")}
                                </span>
                            </div>
                        )}

                        {project.techstack && (
                            <div className="project-detail-meta-item">
                                <span className="project-detail-meta-label">
                                    Stack
                                </span>
                                <span className="project-detail-meta-value project-detail-meta-mono">
                                    {project.techstack}
                                </span>
                            </div>
                        )}

                        <div className="project-detail-meta-item">
                            <span className="project-detail-meta-label">
                                Status
                            </span>
                            <span className="project-detail-meta-value">
                                {isLive ? "Live" : "In development"}
                            </span>
                        </div>
                    </div>

                    {/* Full description */}
                    <div className="project-detail-description-wrap">
                        <h3 className="project-detail-description-title">
                            About this project
                        </h3>
                        <p className="project-detail-description">
                            {project.description}
                        </p>
                    </div>

                    {project.is_hobby && (
                        <p className="project-hobby-note">
                            Personal project, not commissioned work — free
                            to explore.
                        </p>
                    )}

                    {/* Skills chips */}
                    {project.skills?.length > 0 && (
                        <div className="project-detail-skills">
                            <h4 className="project-detail-skills-title">
                                Skills demonstrated
                            </h4>
                            <div className="project-detail-chips">
                                {project.skills.map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="chip chip--skill"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="project-detail-actions">
                        {isLive && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-launch"
                            >
                                Open Live Site
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}