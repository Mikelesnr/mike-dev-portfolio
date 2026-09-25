import React, { useState, useMemo } from "react";
import { Head } from "@inertiajs/react";
import { motion } from "motion/react";
import MainLayout from "../Layouts/MainLayout";
import useProjects from "../Hooks/useProjects";
import ProjectCard from "../Components/Projects/ProjectCard";
import ProjectModal from "../Components/Projects/ProjectModal";
import ProjectDetailModal from "../Components/Projects/ProjectDetailModal";
import Pagination from "../Components/Work/Pagination";

const GITHUB_URL = "https://github.com/Mikelesnr";

function Work() {
    const { projects, currentPage, lastPage, goToPage } = useProjects();
    const [previewProject, setPreviewProject] = useState(null);
    const [detailProject, setDetailProject] = useState(null);
    const [filter, setFilter] = useState("all"); // "all" | "client" | "hobby"

    // Client-side filter — pure derivation from current page's projects
    const filteredProjects = useMemo(() => {
        if (!Array.isArray(projects)) return [];
        if (filter === "client") return projects.filter((p) => !p.is_hobby);
        if (filter === "hobby") return projects.filter((p) => p.is_hobby);
        return projects;
    }, [projects, filter]);

    const totalOnPage = Array.isArray(projects) ? projects.length : 0;
    const showingCount = filteredProjects.length;

    return (
        <>
            <Head>
                <title>My Work — Michael Mwanza</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>

            <section id="Work" className="section projects-section">
                <div className="container container-wide">
                    {/* ---------- Section header -------------------- */}
                    <header className="section-header">
                        <h2 className="body-h2">Things I&apos;ve Built</h2>
                        <span className="section-underline" aria-hidden="true" />
                    </header>

                    <p className="ledger-stub">
                        <span>shipped work, personal builds, all of it</span>
                    </p>

                    <p className="work-lead">
                        A selection of products I&apos;ve shipped for clients,
                        plus the side projects where I try out new ideas.
                        Click any card to preview the live app.
                    </p>

                    {/* ---------- Filter chips + count -------------- */}
                    {totalOnPage > 0 && (
                        <div className="work-toolbar">
                            <div
                                className="work-filters"
                                role="tablist"
                                aria-label="Filter projects"
                            >
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={filter === "all"}
                                    className={`work-filter-chip ${filter === "all" ? "is-active" : ""
                                        }`}
                                    onClick={() => setFilter("all")}
                                >
                                    All
                                </button>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={filter === "client"}
                                    className={`work-filter-chip ${filter === "client" ? "is-active" : ""
                                        }`}
                                    onClick={() => setFilter("client")}
                                >
                                    Client work
                                </button>
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={filter === "hobby"}
                                    className={`work-filter-chip ${filter === "hobby" ? "is-active" : ""
                                        }`}
                                    onClick={() => setFilter("hobby")}
                                >
                                    Personal
                                </button>
                            </div>

                            <span className="work-count">
                                {showingCount} of {totalOnPage} on this page
                            </span>
                        </div>
                    )}

                    {/* ---------- Grid or empty state --------------- */}
                    {filteredProjects.length > 0 ? (
                        <div className="projects-grid">
                            {filteredProjects.map((project, i) => (
                                <motion.div
                                    key={project.id}
                                    className="project-card-cell"
                                    initial={{ opacity: 0, y: 28 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.15 }}
                                    transition={{
                                        duration: 0.7,
                                        delay: 0.05 + i * 0.06,
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
                    ) : (
                        <div className="work-empty">
                            <p className="work-empty-text">
                                {filter === "hobby"
                                    ? "No personal projects on this page."
                                    : filter === "client"
                                        ? "No client projects on this page."
                                        : "No projects to show yet — check back soon."}
                            </p>
                            <a href="/contact" className="btn btn-projects">
                                Have a project in mind?
                            </a>
                        </div>
                    )}

                    {/* ---------- Pagination ------------------------ */}
                    {lastPage > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            lastPage={lastPage}
                            onPageChange={goToPage}
                        />
                    )}

                    {/* ---------- GitHub dev card ------------------- */}
                    <motion.div
                        className="work-dev-card"
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{
                            duration: 0.7,
                            delay: 0.1,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <div className="work-dev-card-text">
                            <span className="work-dev-card-label">
                                For developers
                            </span>
                            <p className="work-dev-card-title">
                                Want to see the code?
                            </p>
                            <p className="work-dev-card-sub">
                                Latest commits, pinned repos, and everything
                                I&apos;m currently building — all on GitHub.
                            </p>
                        </div>

                        <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="work-dev-link work-dev-link-prominent"
                        >
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                            </svg>
                            <span>github.com/Mikelesnr</span>
                            <span
                                className="work-dev-link-arrow"
                                aria-hidden="true"
                            >
                                →
                            </span>
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ---------- Iframe preview modal ------------------- */}
            {previewProject && (
                <ProjectModal
                    project={previewProject}
                    onClose={() => setPreviewProject(null)}
                />
            )}

            {/* ---------- Full-text detail modal ----------------- */}
            {detailProject && (
                <ProjectDetailModal
                    project={detailProject}
                    onClose={() => setDetailProject(null)}
                />
            )}
        </>
    );
}

export default Work;

Work.layout = (page) => <MainLayout children={page} />;