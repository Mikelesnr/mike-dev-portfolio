import React from "react";

/**
 * SkillTag — a non-interactive tag representing a *skill*
 * shown inside a project card.
 *
 * Not a link. Not clickable. Purely a label.
 */
export default function SkillTag({ skill }) {
    return (
        <span className="chip chip--skill" title={skill.name}>
            {skill.name}
        </span>
    );
}