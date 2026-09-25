import React from "react";
import SkillsManager from "./SkillsManager";
import CategoryManager from "./CategoryManager";

export default function SkillsTab({
    categories,
    isAdmin = false,
    categoryForm,
    handleCategorySubmit,
    handleCategoryDelete,
}) {
    return (
        <div>
            {isAdmin ? (
                <>
                    <CategoryManager
                        categories={categories}
                        categoryForm={categoryForm}
                        handleCategorySubmit={handleCategorySubmit}
                        handleCategoryDelete={handleCategoryDelete}
                    />
                    <SkillsManager categories={categories} />
                </>
            ) : (
                <>
                    <header className="dash-tab-header">
                        <h2 className="dash-tab-title">Skills Overview</h2>
                        <p className="dash-tab-sub">
                            Each skill is backed by the real projects it was
                            used on — tag those from the Projects tab.
                        </p>
                    </header>

                    <div className="dash-form-grid-2">
                        {categories.map((cat) => (
                            <div key={cat.id} className="dash-card">
                                <h3 className="dash-card-title">{cat.name}</h3>
                                <div className="dash-card-body">
                                    {cat.skills?.map((skill) => (
                                        <div key={skill.id} className="dash-skill-row">
                                            <div className="dash-skill-name">
                                                {skill.name}
                                            </div>
                                            <div className="dash-skill-projects">
                                                {skill.projects?.length > 0 ? (
                                                    skill.projects.map((p) => (
                                                        <span
                                                            key={p.id}
                                                            className="chip chip--project"
                                                        >
                                                            {p.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="dash-empty-inline">
                                                        not yet tagged to a project
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {(!cat.skills || cat.skills.length === 0) && (
                                        <p className="dash-empty-inline">
                                            No skills linked to this
                                            classification.
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}