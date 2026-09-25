import React, { useState } from "react";
import SkillTag from "./SkillTag";

export default function ProjectCard({ project, onPreview }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);

    const isLive = Boolean(project.url);

    // ---------- Deduplicate skills against techstack text ----------
    const techNames = (project.techstack || "")
        .split(/[,·|•/]/)
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

    const remainingSkills = (project.skills || []).filter(
        (s) => !techNames.includes((s.name || "").toLowerCase())
    );

    const hasManySkills = remainingSkills.length > 4;

    return (
        <div className="project-info">
            {/* ---------- Badges -------------------------------------- */}
            <div className="project-badges">
                <span className="project-status">
                    <span className="project-status-dot" aria-hidden="true" />
                    {isLive ? "Live" : "In development"}
                </span>
                <span
                    className={`project-type-badge ${
                        project.is_hobby
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

            {/* ---------- Description --------------------------------- */}
            <p
                className={`body-p project-description ${
                    isExpanded ? "" : "body-p-truncated"
                } clickable-text`}
                onClick={() => setIsExpanded(!isExpanded)}
                title="Click to expand description"
            >
                {project.description}
                {!isExpanded && (
                    <span className="project-readmore"> … (read more)</span>
                )}
            </p>

            {/* ---------- Tech stack ---------------------------------- */}
            <p className="project-techstack">{project.techstack}</p>

            {/* ---------- Remaining skill chips (deduped) ------------- */}
            {remainingSkills.length > 0 && (
                <div className="project-skills">
                    <div
                        className={`skill-card-projects ${
                            isSkillsExpanded
                                ? "skill-list-expanded"
                                : "skill-list-clamped"
                        }`}
                    >
                        {remainingSkills.map((skill) => (
                            <SkillTag key={skill.id} skill={skill} />
                        ))}
                    </div>

                    {hasManySkills && (
                        <button
                            type="button"
                            onClick={() =>
                                setIsSkillsExpanded(!isSkillsExpanded)
                            }
                            className="project-skills-toggle"
                        >
                            {isSkillsExpanded
                                ? "Show fewer"
                                : "Show all skills"}
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