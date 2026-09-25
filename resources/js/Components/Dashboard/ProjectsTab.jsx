import React from "react";
import ProjectForm from "./ProjectForm";
import ProjectsTable from "./ProjectsTable";

export default function ProjectsTab({
    projects,
    categories,
    projectForm,
    editingProjectId,
    startEditProject,
    cancelEditProject,
    handleProjectSubmit,
    panelStyles,
}) {
    return (
        <div>
            <header className="dash-tab-header">
                <h2 className="dash-tab-title">Projects</h2>
                <p className="dash-tab-sub">
                    Manage the projects shown on /work, and tag each with the
                    skills it demonstrates.
                </p>
            </header>

            <ProjectForm
                projectForm={projectForm}
                categories={categories}
                editingProjectId={editingProjectId}
                cancelEditProject={cancelEditProject}
                handleProjectSubmit={handleProjectSubmit}
                panelStyles={panelStyles}
            />

            <ProjectsTable
                projects={projects}
                startEditProject={startEditProject}
                panelStyles={panelStyles}
            />
        </div>
    );
}