import React from "react";

export default function SkillsTab({ categories }) {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-2">Skills Group Matrix</h2>
            <p className="text-sm text-gray-400 mb-6">
                Live structural inventory mapping for your skills & percentages.
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
                                    <div className="flex justify-between mb-1">
                                        <span>{skill.name}</span>
                                        <span
                                            className="font-mono text-xs"
                                            style={{ color: "#d9ee60" }}
                                        >
                                            {skill.percentage}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden">
                                        <div
                                            className="h-full"
                                            style={{
                                                width: `${skill.percentage}%`,
                                                backgroundColor: "#b6c9b6",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                            {(!cat.skills || cat.skills.length === 0) && (
                                <p className="text-xs text-gray-600 italic">
                                    No skills linked to this classification.
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
