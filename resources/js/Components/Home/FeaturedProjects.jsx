import React, { useState } from "react";
import { motion } from "motion/react";
import ProjectCard from "../Projects/ProjectCard";
import ProjectModal from "../Projects/ProjectModal";
import ProjectDetailModal from "../Projects/ProjectDetailModal";

export default function FeaturedProjects({ projects = [] }) {
    const [previewProject, setPreviewProject] = useState(null);
    const [detailProject, setDetailProject] = useState(null);

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
                        <motion.div
                            key={project.id}
                            className="project-card-cell"
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.7,
                                delay: 0.05 + i * 0.08,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <ProjectCard
                                project={project}
                                onPreview={setPreviewProject}
                                onReadMore={setDetailProject}
                            />
                        </motion.div>
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

            {detailProject && (
                <ProjectDetailModal
                    project={detailProject}
                    onClose={() => setDetailProject(null)}
                />
            )}
        </section>
    );
}