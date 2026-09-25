import React from "react";

export default function CategoryManager({
    categories,
    categoryForm,
    handleCategorySubmit,
    handleCategoryDelete,
}) {
    return (
        <div className="dash-card dash-card-spaced">
            <h4 className="dash-card-title">Skill Categories</h4>
            <p className="dash-form-sub">
                Categories group related skills (e.g. &quot;Frameworks&quot;,
                &quot;DevOps &amp; Infrastructure&quot;). Add a new one here
                before tagging skills under it below.
            </p>

            <form onSubmit={handleCategorySubmit} className="dash-inline-form">
                <input
                    type="text"
                    placeholder="New category name"
                    className="dash-input"
                    value={categoryForm.data.name}
                    onChange={(e) =>
                        categoryForm.setData("name", e.target.value)
                    }
                    required
                />
                <button
                    type="submit"
                    disabled={categoryForm.processing}
                    className="dash-btn-primary"
                >
                    {categoryForm.processing ? "Adding..." : "Add Category"}
                </button>
            </form>

            <div className="dash-chip-row">
                {categories.map((cat) => (
                    <span key={cat.id} className="dash-cat-chip">
                        {cat.name}
                        <span className="dash-cat-chip-count">
                            ({cat.skills?.length ?? 0})
                        </span>
                        <button
                            type="button"
                            onClick={() =>
                                handleCategoryDelete(cat.id, cat.name)
                            }
                            className="dash-btn-x"
                            title="Delete category and all its skills"
                            aria-label={`Delete ${cat.name}`}
                        >
                            ×
                        </button>
                    </span>
                ))}
                {categories.length === 0 && (
                    <p className="dash-empty-inline">
                        No categories yet — add one above.
                    </p>
                )}
            </div>
        </div>
    );
}