import React, { useState } from "react";
import ProjectCard from "../Projects/ProjectCard";
import ProjectModal from "../Projects/ProjectModal";

export default function FeaturedProjects({ projects = [] }) {
    const [previewProject, setPreviewProject] = useState(null);

    if (projects.length === 0) return null;

    return (
        <section id="featured-projects" className="section projects-section">
            <div className="container container-wide">
                <h2 className="body-h2">Featured Projects</h2>
                <p className="ledger-stub">
                    <span>shipped &amp; in progress</span>
                </p>

                <div className="content projects-grid" style={{ maxWidth: "100%" }}>
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            onPreview={setPreviewProject}
                        />
                    ))}
                </div>

                <a href="/work" className="btn btn-projects">
                    See All Projects
                </a>
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
