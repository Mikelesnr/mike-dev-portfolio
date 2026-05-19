import React from "react";
import { useForm } from "@inertiajs/react";

export default function SkillsManager({ categories }) {
    const {
        data,
        setData,
        post,
        delete: destroy,
        reset,
        processing,
    } = useForm({
        category_id: "",
        name: "",
        percentage: 50,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("breeze.skills.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="space-y-8">
            {/* ADD SKILL FORM */}
            <form
                onSubmit={submit}
                className="bg-black/40 p-5 rounded-xl border border-gray-800"
            >
                <h4 className="text-white font-bold mb-4">Add New Skill</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                        className="bg-black border border-gray-700 rounded p-2 text-white"
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
                        className="bg-black border border-gray-700 rounded p-2 text-white"
                        onChange={(e) => setData("name", e.target.value)}
                        value={data.name}
                        required
                    />
                    <input
                        type="number"
                        placeholder="%"
                        className="bg-black border border-gray-700 rounded p-2 text-white"
                        onChange={(e) => setData("percentage", e.target.value)}
                        value={data.percentage}
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="mt-4 bg-[#d9ee60] text-black font-black py-2 px-6 rounded"
                >
                    {processing ? "Adding..." : "Add Skill"}
                </button>
            </form>

            {/* DELETE LIST */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                    <div
                        key={cat.id}
                        className="bg-black/20 p-5 rounded-xl border border-gray-800"
                    >
                        <h3 className="text-white font-bold mb-3">
                            {cat.name}
                        </h3>
                        {cat.skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="flex justify-between items-center text-sm py-1 border-b border-gray-900"
                            >
                                <span>{skill.name}</span>
                                <button
                                    onClick={() =>
                                        destroy(
                                            route(
                                                "admin.skills.destroy",
                                                skill.id,
                                            ),
                                        )
                                    }
                                    className="text-red-400 hover:text-red-600 font-bold px-2"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
