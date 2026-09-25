import React from "react";
import { useForm } from "@inertiajs/react";

export default function SkillsManager({ categories }) {
    const { data, setData, post, delete: destroy, reset, processing } = useForm({
        category_id: "",
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("breeze.skills.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="dash-skills-manager">
            <form onSubmit={submit} className="dash-form">
                <h4 className="dash-form-title">Add New Skill</h4>
                <p className="dash-form-sub">
                    Tag which projects prove this skill from the Projects tab
                    after adding it here.
                </p>
                <div className="dash-form-grid-2">
                    <select
                        className="dash-select"
                        onChange={(e) => setData("category_id", e.target.value)}
                        value={data.category_id}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Skill Name"
                        className="dash-input"
                        onChange={(e) => setData("name", e.target.value)}
                        value={data.name}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="dash-btn-primary"
                >
                    {processing ? "Adding..." : "Add Skill"}
                </button>
            </form>

            <div className="dash-form-grid-2">
                {categories.map((cat) => (
                    <div key={cat.id} className="dash-card">
                        <h3 className="dash-card-title">{cat.name}</h3>
                        <div className="dash-card-body">
                            {cat.skills.map((skill) => (
                                <div key={skill.id} className="dash-skill-row">
                                    <span className="dash-skill-name">
                                        {skill.name}
                                    </span>
                                    <button
                                        onClick={() =>
                                            destroy(
                                                route(
                                                    "admin.skills.destroy",
                                                    skill.id
                                                )
                                            )
                                        }
                                        className="dash-btn-x"
                                        aria-label={`Delete ${skill.name}`}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}