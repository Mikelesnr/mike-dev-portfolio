import React, { useState, useRef, useEffect } from "react";
import SkillTag from "./SkillTag";

export default function ProjectCard({ project, onPreview, onReadMore }) {
    const isLive = Boolean(project.url);
    const skills = project.skills || [];
    const descriptionRef = useRef(null);
    const skillsRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const [skillsOverflowing, setSkillsOverflowing] = useState(false);

    // Detect whether the description actually overflows 3 lines
    useEffect(() => {
        const el = descriptionRef.current;
        if (!el) return;
        setIsOverflowing(el.scrollHeight > el.clientHeight + 2);
    }, [project.description]);

    // Detect whether the skills chips overflow their 2-row container
    useEffect(() => {
        const el = skillsRef.current;
        if (!el) return;
        setSkillsOverflowing(el.scrollHeight > el.clientHeight + 2);
    }, [skills.length]);

    const handleOpenDetail = () => onReadMore?.(project);

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

            <br></br>

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

            {isOverflowing && (
                <button
                    type="button"
                    className="project-readmore-btn"
                    onClick={handleOpenDetail}
                >
                    Read more
                    <span aria-hidden="true"> →</span>
                </button>
            )}

            {/* ---------- Skill chips (2-row clamp) ------------------- */}
            {skills.length > 0 && (
                <div className="project-skills">
                    <div
                        ref={skillsRef}
                        className={`skill-card-projects is-clamped ${skillsOverflowing ? "is-overflowing" : ""
                            }`}
                    >
                        {skills.map((skill) => (
                            <SkillTag key={skill.id} skill={skill} />
                        ))}
                    </div>
                    {skillsOverflowing && (
                        <button
                            type="button"
                            className="project-skills-more"
                            onClick={handleOpenDetail}
                        >
                            + more
                            <span aria-hidden="true"> →</span>
                        </button>
                    )}
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