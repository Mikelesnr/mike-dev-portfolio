import React from "react";

export default function Pagination({ currentPage, lastPage, onPageChange }) {
    // Build a small window of page numbers around the current page.
    // On mobile we hide these and rely on Prev/Next only.
    const windowSize = 2;
    const pages = [];
    for (let i = 1; i <= lastPage; i++) {
        if (
            i === 1 ||
            i === lastPage ||
            (i >= currentPage - windowSize && i <= currentPage + windowSize)
        ) {
            pages.push(i);
        } else if (pages[pages.length - 1] !== "…") {
            pages.push("…");
        }
    }

    const goTo = (page) => {
        if (page < 1 || page > lastPage || page === currentPage) return;
        onPageChange(page);
    };

    return (
        <nav className="pagination" aria-label="Pagination">
            <button
                type="button"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-btn pagination-prev"
                aria-label="Previous page"
            >
                <span aria-hidden="true">←</span>
                <span className="pagination-btn-label">Prev</span>
            </button>

            <div className="pagination-pages">
                {pages.map((p, idx) =>
                    p === "…" ? (
                        <span
                            key={`gap-${idx}`}
                            className="pagination-gap"
                            aria-hidden="true"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={p}
                            type="button"
                            onClick={() => goTo(p)}
                            className={`pagination-page ${p === currentPage ? "is-active" : ""
                                }`}
                            aria-label={`Go to page ${p}`}
                            aria-current={
                                p === currentPage ? "page" : undefined
                            }
                        >
                            {p}
                        </button>
                    )
                )}
            </div>

            <button
                type="button"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="pagination-btn pagination-next"
                aria-label="Next page"
            >
                <span className="pagination-btn-label">Next</span>
                <span aria-hidden="true">→</span>
            </button>
        </nav>
    );
}