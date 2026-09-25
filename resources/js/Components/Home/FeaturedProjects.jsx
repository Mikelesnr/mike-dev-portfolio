import React, { useState } from "react";
import { Reveal } from "../../Hooks/useReveal";
import ProjectCard from "../Projects/ProjectCard";
import ProjectModal from "../Projects/ProjectModal";

export default function FeaturedProjects({ projects = [] }) {
    const [previewProject, setPreviewProject] = useState(null);

    if (projects.length === 0) return null;

    return (
        <section id="featured-projects" className="section projects-section">
            <div className="container container-wide">
                <header className="section-header">
                    <h2 className="body-h2">Featured Projects</h2>
                    <span className="section-underline" aria-hidden="true" />
                </header>

                <p className="ledger-stub">
                    <span>shipped &amp; in progress</span>
                </p>

                <div className="projects-grid featured-grid">
                    {projects.map((project, i) => (
                        <Reveal
                            key={project.id}
                            delay={0.05 + i * 0.08}
                            y={32}
                            className="project-card-wrap"
                        >
                            <ProjectCard
                                project={project}
                                onPreview={setPreviewProject}
                            />
                        </Reveal>
                    ))}
                </div>

                <div className="projects-footer">
                    <a href="/work" className="btn btn-projects btn-with-arrow">
                        <span>See All Projects</span>
                        <span className="btn-arrow" aria-hidden="true">
                            →
                        </span>
                    </a>
                </div>
            </div>

            {previewProject && (
                <ProjectModal
                    project={previewProject}
                    onClose={() => setPreviewProject(null)}
                />
            )}
        </section>
    );
}