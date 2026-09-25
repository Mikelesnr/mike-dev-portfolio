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
            className="dash-form"
        >
            <h3
                className={`dash-form-title ${editingProjectId ? "is-editing" : ""
                    }`}
            >
                {editingProjectId
                    ? `Edit Project (ID: ${editingProjectId})`
                    : "Add New Project"}
            </h3>

            <div className="dash-form-grid-2">
                <div className="dash-field">
                    <label className="dash-label">Project Name</label>
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
                <div className="dash-field">
                    <label className="dash-label">
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

            <div className="dash-field">
                <label className="dash-label">Description</label>
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

            <div className="dash-form-grid-2">
                <div className="dash-field">
                    <label className="dash-label">Tech Stack</label>
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
                <div className="dash-field">
                    <label className="dash-label">Deployment</label>
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

            <div className="dash-field">
                <label className="dash-label dash-label-block">
                    Skills demonstrated on this project
                </label>
                <div className="dash-form-grid-2">
                    {categories.map((cat) => (
                        <div key={cat.id}>
                            <p className="dash-cat-name">{cat.name}</p>
                            <div className="dash-skill-chips">
                                {cat.skills?.map((skill) => {
                                    const checked = (
                                        projectForm.data.skill_ids ?? []
                                    ).includes(skill.id);
                                    return (
                                        <label
                                            key={skill.id}
                                            className={`dash-skill-chip ${checked ? "is-checked" : ""
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="dash-skill-chip-input"
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

            <div className="dash-check-row">
                <input
                    type="checkbox"
                    id="is_featured"
                    checked={Boolean(projectForm.data.is_featured)}
                    onChange={(e) =>
                        projectForm.setData("is_featured", e.target.checked)
                    }
                />
                <label htmlFor="is_featured" className="dash-check-label">
                    Show in Featured Projects on the homepage
                </label>
            </div>

            <div className="dash-check-row">
                <input
                    type="checkbox"
                    id="is_hobby"
                    checked={Boolean(projectForm.data.is_hobby)}
                    onChange={(e) =>
                        projectForm.setData("is_hobby", e.target.checked)
                    }
                />
                <label htmlFor="is_hobby" className="dash-check-label">
                    Hobby / side project (not commissioned client work)
                </label>
            </div>

            <div className="dash-form-actions">
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