import React from "react";
import SkillsManager from "./SkillsManager";

export default function SkillsTab({ categories, isAdmin = false }) {
    return (
        <div>
            {isAdmin ? (
                // ADMIN VIEW: CRUD Operations
                <SkillsManager categories={categories} />
            ) : (
                // PUBLIC/READ-ONLY VIEW: which projects prove each skill
                <>
                    <h2 className="text-2xl font-bold mb-2">Skills Overview</h2>
                    <p className="text-sm text-gray-400 mb-6">
                        Each skill is backed by the real projects it was used
                        on — tag those from the Projects tab.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {categories.map((cat) => (
                            <div
                                key={cat.id}
                                className="bg-black/20 p-5 rounded-xl border border-gray-800"
                            >
                                <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-2 mb-3">
                                    {cat.name}
                                </h3>
                                <div className="space-y-3">
                                    {cat.skills?.map((skill) => (
                                        <div key={skill.id} className="text-sm">
                                            <div className="mb-1 font-semibold">
                                                {skill.name}
                                            </div>
                                            <div className="flex flex-wrap gap-1">
                                                {skill.projects?.length > 0 ? (
                                                    skill.projects.map((p) => (
                                                        <span
                                                            key={p.id}
                                                            className="text-xs px-2 py-0.5 rounded-full"
                                                            style={{
                                                                color: "#6fd0c1",
                                                                border: "1px solid rgba(111,208,193,0.3)",
                                                            }}
                                                        >
                                                            {p.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-gray-600 italic">
                                                        not yet tagged to a project
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                    {(!cat.skills ||
                                        cat.skills.length === 0) && (
                                        <p className="text-xs text-gray-600 italic">
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
