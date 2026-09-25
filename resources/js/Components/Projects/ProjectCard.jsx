import React, { useState, useRef, useEffect } from "react";
import SkillTag from "./SkillTag";

export default function ProjectCard({ project, onPreview, onReadMore }) {
    const isLive = Boolean(project.url);
    const skills = project.skills || [];
    const descriptionRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    // Detect whether the description actually overflows 3 lines
    useEffect(() => {
        const el = descriptionRef.current;
        if (!el) return;
        // scrollHeight > clientHeight means text is clipped by line-clamp
        setIsOverflowing(el.scrollHeight > el.clientHeight + 2);
    }, [project.description]);

    return (
        <div className="project-info">
            {/* ---------- Badges -------------------------------------- */}
            <div className="project-badges">
                <span className="project-status">
                    <span className="project-status-dot" aria-hidden="true" />
                    {isLive ? "Live" : "In development"}
                </span>
                <span
                    className={`project-type-badge ${project.is_hobby
                            ? "project-type-hobby"
                            : "project-type-client"
                        }`}
                >
                    {project.is_hobby ? "Hobby Project" : "Professional Build"}
                </span>
            </div>

            {/* ---------- Title --------------------------------------- */}
            <h3 className="project-name">{project.name}</h3>

            {project.is_hobby && (
                <p className="project-hobby-note">
                    Personal project, not commissioned work — free to explore.
                </p>
            )}

            {project.customers?.length > 0 && (
                <p className="project-client">
                    Built for{" "}
                    {project.customers.map((c) => c.name).join(", ")}
                </p>
            )}

            {/* ---------- Clamped description ------------------------- */}
            <p
                ref={descriptionRef}
                className="body-p project-description is-truncated"
            >
                {project.description}
            </p>

            {/* Only show this if the description is actually clipped */}
            {isOverflowing && (
                <button
                    type="button"
                    className="project-readmore-btn"
                    onClick={() => onReadMore?.(project)}
                >
                    Read more
                    <span aria-hidden="true"> →</span>
                </button>
            )}

            {/* ---------- Skill chips --------------------------------- */}
            {skills.length > 0 && (
                <div className="project-skills">
                    <div className="skill-card-projects">
                        {skills.map((skill) => (
                            <SkillTag key={skill.id} skill={skill} />
                        ))}
                    </div>
                </div>
            )}

            {/* ---------- Actions ------------------------------------- */}
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