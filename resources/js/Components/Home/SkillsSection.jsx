import React, { useState } from "react";
import { Reveal } from "../../Hooks/useReveal";
import SkillCard from "./SkillCard";

/**
 * Map a category name → client-friendly capability copy.
 * Keeps the raw name (which is data) but shows a warmer headline.
 * If a category isn't in the map, we fall back to the raw name.
 */
const CLIENT_COPY = {
    Frontend: "Interfaces people actually enjoy using",
    Backend: "Servers that stay fast under real load",
    Database: "Data that stays accurate and available",
    DevOps: "Ships that deploy themselves, safely",
    Tools: "The right tool, every time",
    "Programming Languages": "Fluent across the modern stack",
    Frameworks: "The right framework for the job",
};

const CLIENT_SUBCOPY = {
    Frontend:
        "Clean, fast, accessible UIs — from single pages to full dashboards.",
    Backend:
        "APIs, auth, business logic and background jobs that hold up under pressure.",
    Database:
        "Schema design, migrations and query performance tuned for the real world.",
    DevOps:
        "CI/CD, containerisation and deployment pipelines that let you ship daily.",
    Tools: "The everyday kit — editors, debuggers, version control and more.",
};

export default function SkillsSection({ categories = [] }) {
    const [showUnderTheHood, setShowUnderTheHood] = useState(false);

    return (
        <section id="Skills" className="section skills-section">
            <div className="container container-skills">
                <header className="section-header">
                    <h2 className="body-h2">What I can build for you</h2>
                    <span className="section-underline" aria-hidden="true" />
                </header>

                <p className="section-lead">
                    Real capabilities, proven on real builds — grouped by what
                    they do for your business.
                </p>

                {/* ---------- Client-facing capability cards ---------------- */}
                <div className="skills-content">
                    {categories.map((category, i) => {
                        const clientTitle =
                            CLIENT_COPY[category.name] ?? category.name;
                        const clientSub = CLIENT_SUBCOPY[category.name];

                        return (
                            <Reveal
                                key={category.id}
                                className="skill-category-wrap"
                                delay={0.05 + i * 0.06}
                                y={28}
                            >
                                <div className="skill-category">
                                    <div
                                        className="skill-category-accent"
                                        aria-hidden="true"
                                    />
                                    <h3 className="skill-category-title">
                                        {clientTitle}
                                    </h3>
                                    {clientSub && (
                                        <p className="skill-category-sub">
                                            {clientSub}
                                        </p>
                                    )}
                                </div>
                            </Reveal>
                        );
                    })}
                </div>

                {/* ---------- Under the hood (technical) -------------------- */}
                <div className="under-the-hood">
                    <button
                        type="button"
                        className="under-the-hood-toggle"
                        aria-expanded={showUnderTheHood}
                        aria-controls="under-the-hood-panel"
                        onClick={() =>
                            setShowUnderTheHood((v) => !v)
                        }
                    >
                        <span>
                            {showUnderTheHood
                                ? "Hide the technical detail"
                                : "Under the hood"}
                        </span>
                        <span
                            className={`under-the-hood-arrow ${
                                showUnderTheHood ? "is-open" : ""
                            }`}
                            aria-hidden="true"
                        >
                            ↓
                        </span>
                    </button>

                    <div
                        id="under-the-hood-panel"
                        className={`under-the-hood-panel ${
                            showUnderTheHood ? "is-open" : ""
                        }`}
                    >
                        <div className="skills-content skills-content-technical">
                            {categories.map((category) => (
                                <div
                                    className="skill-category skill-category-technical"
                                    key={category.id}
                                >
                                    <h3>{category.name}</h3>
                                    {category.skills?.map((skill) => (
                                        <SkillCard
                                            key={skill.id}
                                            skill={skill}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}