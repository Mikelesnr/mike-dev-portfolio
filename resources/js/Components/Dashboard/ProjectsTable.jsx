import React from "react";
import { useForm } from "@inertiajs/react";

export default function ProjectsTable({ projects, startEditProject, panelStyles }) {
    const deleteForm = useForm();

    const handleDeleteProject = (id, name) => {
        if (confirm(`Delete "${name}" from your portfolio?`)) {
            deleteForm.delete(route("admin.projects.destroy", id));
        }
    };

    return (
        <div>
            <h3 className="dash-table-heading">
                Existing Projects ({projects.length})
            </h3>
            <div className="dash-table-wrap">
                <table className="dash-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Tech Stack</th>
                            <th>Deployment</th>
                            <th>Skills</th>
                            <th className="text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((proj) => (
                            <tr key={proj.id}>
                                <td className="dash-td-name">{proj.name}</td>
                                <td className="dash-td-mono">{proj.techstack}</td>
                                <td>
                                    <span className="dash-badge">
                                        {proj.deployment}
                                    </span>
                                </td>
                                <td className="dash-td-mono">
                                    {proj.skills?.map((s) => s.name).join(", ") || "—"}
                                </td>
                                <td>
                                    <div className="dash-actions">
                                        <button
                                            type="button"
                                            style={panelStyles.editInlineBtn}
                                            onClick={() => startEditProject(proj)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="dash-btn-delete"
                                            disabled={deleteForm.processing}
                                            onClick={() =>
                                                handleDeleteProject(proj.id, proj.name)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {projects.length === 0 && (
                            <tr>
                                <td colSpan="5" className="dash-empty">
                                    No projects yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}