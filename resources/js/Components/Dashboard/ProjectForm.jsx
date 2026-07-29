import React from "react";

export default function ProjectForm({
    projectForm,
    categories,
    editingProjectId,
    cancelEditProject,
    handleProjectSubmit,
    panelStyles,
}) {
    const toggleSkill = (skillId) => {
        const current = projectForm.data.skill_ids ?? [];
        const next = current.includes(skillId)
            ? current.filter((id) => id !== skillId)
            : [...current, skillId];
        projectForm.setData("skill_ids", next);
    };

    return (
        <form
            onSubmit={handleProjectSubmit}
            className="space-y-4 mb-8 bg-black/20 p-6 rounded-xl border border-gray-800"
        >
            <h3
                className="text-md font-bold text-white mb-2"
                style={{ color: editingProjectId ? "#d9ee60" : "white" }}
            >
                {editingProjectId
                    ? `Edit Project (ID: ${editingProjectId})`
                    : "Add New Project"}
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
                        Live URL (leave blank if not public yet)
                    </label>
                    <input
                        type="url"
                        style={panelStyles.inputField}
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
                        placeholder="e.g. Laravel, React, Inertia.js"
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
                        Deployment
                    </label>
                    <input
                        type="text"
                        placeholder="e.g. Live production site, In development"
                        style={panelStyles.inputField}
                        required
                        value={projectForm.data.deployment}
                        onChange={(e) =>
                            projectForm.setData("deployment", e.target.value)
                        }
                    />
                </div>
            </div>

            <div>
                <label className="text-xs font-bold uppercase block mb-2">
                    Skills demonstrated on this project
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categories.map((cat) => (
                        <div key={cat.id}>
                            <p className="text-xs text-gray-500 mb-1">
                                {cat.name}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {cat.skills?.map((skill) => {
                                    const checked = (
                                        projectForm.data.skill_ids ?? []
                                    ).includes(skill.id);
                                    return (
                                        <label
                                            key={skill.id}
                                            className="text-xs px-2 py-1 rounded-full cursor-pointer border"
                                            style={{
                                                borderColor: checked
                                                    ? "#d9ee60"
                                                    : "#374151",
                                                color: checked
                                                    ? "#d9ee60"
                                                    : "#9ca3af",
                                            }}
                                        >
                                            <input
                                                type="checkbox"
                                                className="hidden"
                                                checked={checked}
                                                onChange={() =>
                                                    toggleSkill(skill.id)
                                                }
                                            />
                                            {skill.name}
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="is_featured"
                    checked={Boolean(projectForm.data.is_featured)}
                    onChange={(e) =>
                        projectForm.setData("is_featured", e.target.checked)
                    }
                />
                <label htmlFor="is_featured" className="text-xs font-bold uppercase">
                    Show in Featured Projects on the homepage
                </label>
            </div>

            <div className="flex items-center">
                <button
                    type="submit"
                    style={panelStyles.primaryBtn}
                    disabled={projectForm.processing}
                >
                    {projectForm.processing
                        ? "Saving..."
                        : editingProjectId
                          ? "Update Project"
                          : "Save Project"}
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
    );
}
