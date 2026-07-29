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
            <h2 className="text-2xl font-bold mb-2">Projects</h2>
            <p className="text-sm text-gray-400 mb-6">
                Manage the projects shown on /work, and tag each with the
                skills it demonstrates.
            </p>

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
