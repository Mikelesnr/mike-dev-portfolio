import React from "react";

export default function CategoryManager({
    categories,
    categoryForm,
    handleCategorySubmit,
    handleCategoryDelete,
}) {
    return (
        <div className="bg-black/40 p-5 rounded-xl border border-gray-800 mb-8">
            <h4 className="text-white font-bold mb-4">Skill Categories</h4>
            <p className="text-xs text-gray-500 mb-4">
                Categories group related skills (e.g. "Frameworks",
                "DevOps &amp; Infrastructure"). Add a new one here before
                tagging skills under it below.
            </p>

            <form
                onSubmit={handleCategorySubmit}
                className="flex flex-col md:flex-row gap-3 mb-5"
            >
                <input
                    type="text"
                    placeholder="New category name"
                    className="bg-black border border-gray-700 rounded p-2 text-white flex-1"
                    value={categoryForm.data.name}
                    onChange={(e) =>
                        categoryForm.setData("name", e.target.value)
                    }
                    required
                />
                <button
                    type="submit"
                    disabled={categoryForm.processing}
                    className="bg-[#d9ee60] text-black font-black py-2 px-6 rounded whitespace-nowrap"
                >
                    {categoryForm.processing ? "Adding..." : "Add Category"}
                </button>
            </form>

            <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                    <span
                        key={cat.id}
                        className="flex items-center gap-2 text-sm bg-black/30 border border-gray-800 rounded-full px-3 py-1"
                    >
                        {cat.name}
                        <span className="text-xs text-gray-500">
                            ({cat.skills?.length ?? 0})
                        </span>
                        <button
                            type="button"
                            onClick={() =>
                                handleCategoryDelete(cat.id, cat.name)
                            }
                            className="text-red-400 hover:text-red-600 font-bold"
                            title="Delete category and all its skills"
                        >
                            ×
                        </button>
                    </span>
                ))}
                {categories.length === 0 && (
                    <p className="text-xs text-gray-600 italic">
                        No categories yet — add one above.
                    </p>
                )}
            </div>
        </div>
    );
}
