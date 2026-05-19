import React from "react";
import { useForm } from "@inertiajs/react";

export default function ProjectsTab({
    projects,
    projectForm,
    editingProjectId,
    startEditProject,
    cancelEditProject,
    handleProjectSubmit,
    panelStyles,
}) {
    // We use a standalone form helper instance specifically to handle clean row deletions
    const deleteForm = useForm();

    const handleDeleteProject = (id, name) => {
        if (
            confirm(
                `Are you absolutely sure you want to delete "${name}" from your portfolio metrics?`,
            )
        ) {
            // Directs the destructive call straight to your resource endpoint
            deleteForm.delete(route("admin.projects.destroy", id), {
                onSuccess: () =>
                    alert("Record permanently removed from database matrices."),
            });
        }
    };

    // Extended styling tokens for the action button block
    const actionStyles = {
        btnGroup: {
            display: "flex",
            gap: "8px",
            justifyContent: "flex-end",
        },
        deleteInlineBtn: {
            backgroundColor: "#ef4444", // Red color for destructive operations
            color: "#ffffff",
            padding: "4px 10px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
            cursor: "pointer",
            border: "none",
            transition: "background-color 0.2s ease",
        },
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Projects Matrix</h2>
            <p className="text-sm text-gray-400 mb-6">
                Manage data representations from your project blueprint model.
            </p>

            {/* Dynamic Context Form Block */}
            <form
                onSubmit={handleProjectSubmit}
                className="space-y-4 mb-8 bg-black/20 p-6 rounded-xl border border-gray-800"
            >
                <h3
                    className="text-md font-bold text-white mb-2"
                    style={{ color: editingProjectId ? "#d9ee60" : "white" }}
                >
                    {editingProjectId
                        ? `📝 Edit Project Setup (ID: ${editingProjectId})`
                        : "➕ Create Parallel Entry"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold uppercase">
                            Project Name
                        </label>
                        <input
                            type="text"
                            style={panelStyles.inputField}
                            required
                            value={projectForm.data.name}
                            onChange={(e) =>
                                projectForm.setData("name", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase">
                            Deployment URL
                        </label>
                        <input
                            type="url"
                            style={panelStyles.inputField}
                            required
                            value={projectForm.data.url}
                            onChange={(e) =>
                                projectForm.setData("url", e.target.value)
                            }
                        />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-bold uppercase">
                        Description
                    </label>
                    <textarea
                        rows="3"
                        style={panelStyles.inputField}
                        required
                        value={projectForm.data.description}
                        onChange={(e) =>
                            projectForm.setData("description", e.target.value)
                        }
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-bold uppercase">
                            Tech Stack
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Next.js, React, Supabase"
                            style={panelStyles.inputField}
                            required
                            value={projectForm.data.techstack}
                            onChange={(e) =>
                                projectForm.setData("techstack", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold uppercase">
                            Deployment Host
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Vultr VPS, Render Staging"
                            style={panelStyles.inputField}
                            required
                            value={projectForm.data.deployment}
                            onChange={(e) =>
                                projectForm.setData(
                                    "deployment",
                                    e.target.value,
                                )
                            }
                        />
                    </div>
                </div>

                <div className="flex items-center">
                    <button
                        type="submit"
                        style={panelStyles.primaryBtn}
                        disabled={projectForm.processing}
                    >
                        {projectForm.processing
                            ? "Saving Matrix Sync..."
                            : editingProjectId
                              ? "Update Changes"
                              : "Save Test Project"}
                    </button>
                    {editingProjectId && (
                        <button
                            type="button"
                            style={panelStyles.secondaryBtn}
                            onClick={cancelEditProject}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* View Table Mirroring admin.blade with injected Edit & Delete Operations */}
            <h3 className="text-md font-bold mb-3">
                Existing Records Snapshot ({projects.length})
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-t border-gray-800">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-800">
                            <th className="py-3 px-2">ID</th>
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Tech Stack</th>
                            <th className="py-3 px-2">Deployment</th>
                            <th className="py-3 px-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((proj) => (
                            <tr
                                key={proj.id}
                                className="border-b border-gray-900 hover:bg-black/10"
                            >
                                <td className="py-3 px-2 font-mono text-xs">
                                    {proj.id}
                                </td>
                                <td className="py-3 px-2 font-bold text-white">
                                    {proj.name}
                                </td>
                                <td className="py-3 px-2 text-xs">
                                    {proj.techstack}
                                </td>
                                <td className="py-3 px-2">
                                    <span className="bg-emerald-950 px-2 py-1 rounded text-emerald-400 text-xs">
                                        {proj.deployment}
                                    </span>
                                </td>
                                <td className="py-3 px-2">
                                    <div style={actionStyles.btnGroup}>
                                        <button
                                            type="button"
                                            style={panelStyles.editInlineBtn}
                                            onClick={() =>
                                                startEditProject(proj)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            style={actionStyles.deleteInlineBtn}
                                            disabled={deleteForm.processing}
                                            onClick={() =>
                                                handleDeleteProject(
                                                    proj.id,
                                                    proj.name,
                                                )
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
                                <td
                                    colSpan="5"
                                    className="text-center py-6 text-gray-500"
                                >
                                    No project records found in local tables.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
