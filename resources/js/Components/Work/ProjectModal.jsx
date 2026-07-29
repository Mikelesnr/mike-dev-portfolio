import React, { useEffect } from "react";

export default function ProjectModal({ project, onClose }) {
    // Close on Escape, and lock page scroll while the modal is open.
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    if (!project) return null;

    const hasLiveUrl = Boolean(project.url);

    // Only close when the click starts on the dimmed backdrop itself,
    // never when it starts inside the modal panel.
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="project-modal-overlay" onMouseDown={handleOverlayClick}>
            <div className="project-modal" role="dialog" aria-modal="true" aria-label={project.name}>
                <div className="project-modal-header">
                    <div className="project-modal-title">
                        <strong>{project.name}</strong>
                        {hasLiveUrl && <span>{project.url}</span>}
                    </div>
                    <button
                        type="button"
                        className="project-modal-close"
                        onClick={onClose}
                        aria-label="Close preview"
                    >
                        ×
                    </button>
                </div>
                <div className="project-modal-body">
                    {hasLiveUrl ? (
                        <iframe
                            src={project.url}
                            className="project-modal-iframe"
                            title={project.name}
                        ></iframe>
                    ) : (
                        <div className="project-modal-placeholder">
                            {project.name} is still in active development —
                            no public preview yet.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
