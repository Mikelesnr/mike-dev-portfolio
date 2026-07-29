import React from "react";
import { useForm } from "@inertiajs/react";

const actionStyles = {
    btnGroup: {
        display: "flex",
        gap: "8px",
        justifyContent: "flex-end",
    },
    deleteInlineBtn: {
        backgroundColor: "#ef4444",
        color: "#ffffff",
        padding: "4px 10px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "bold",
        cursor: "pointer",
        border: "none",
    },
};

export default function ProjectsTable({ projects, startEditProject, panelStyles }) {
    const deleteForm = useForm();

    const handleDeleteProject = (id, name) => {
        if (confirm(`Delete "${name}" from your portfolio?`)) {
            deleteForm.delete(route("admin.projects.destroy", id));
        }
    };

    return (
        <div>
            <h3 className="text-md font-bold mb-3">
                Existing Projects ({projects.length})
            </h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-t border-gray-800">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-800">
                            <th className="py-3 px-2">Name</th>
                            <th className="py-3 px-2">Tech Stack</th>
                            <th className="py-3 px-2">Deployment</th>
                            <th className="py-3 px-2">Skills</th>
                            <th className="py-3 px-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((proj) => (
                            <tr
                                key={proj.id}
                                className="border-b border-gray-900 hover:bg-black/10"
                            >
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
                                <td className="py-3 px-2 text-xs text-gray-400">
                                    {proj.skills?.map((s) => s.name).join(", ") || "—"}
                                </td>
                                <td className="py-3 px-2">
                                    <div style={actionStyles.btnGroup}>
                                        <button
                                            type="button"
                                            style={panelStyles.editInlineBtn}
                                            onClick={() => startEditProject(proj)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            style={actionStyles.deleteInlineBtn}
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
                                <td colSpan="5" className="text-center py-6 text-gray-500">
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
