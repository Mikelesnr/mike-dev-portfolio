import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";
import useProjects from "../Hooks/useProjects";
import ProjectCard from "../Components/Work/ProjectCard";
import ProjectModal from "../Components/Work/ProjectModal";
import Pagination from "../Components/Work/Pagination";

function Work() {
    const { projects, currentPage, lastPage, goToPage } = useProjects();
    const [previewProject, setPreviewProject] = useState(null);

    return (
        <>
            <Head>
                <title>My Work — Michael Mwanza</title>
            </Head>

            <section id="Work" className="section projects-section">
                <div className="container container-skills">
                    <h2 className="body-h2">My Projects</h2>
                    <p className="ledger-stub">
                        <span>click a project to launch it</span>
                    </p>

                    <div className="content projects-grid" style={{ maxWidth: "100%" }}>
                        {Array.isArray(projects) &&
                            projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    onPreview={setPreviewProject}
                                />
                            ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        onPageChange={goToPage}
                    />
                </div>
            </section>

            {previewProject && (
                <ProjectModal
                    project={previewProject}
                    onClose={() => setPreviewProject(null)}
                />
            )}
        </>
    );
}

export default Work;

Work.layout = (page) => <MainLayout children={page} />;
