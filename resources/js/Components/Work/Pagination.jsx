import React from "react";

export default function Pagination({ currentPage, lastPage, onPageChange }) {
    return (
        <div className="pagination buttons">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-projects"
            >
                Prev
            </button>
            <span style={{ margin: "0 12px", fontFamily: "var(--font-mono)", fontSize: "13px" }}>
                Page {currentPage} of {lastPage}
            </span>
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="btn btn-projects"
            >
                Next
            </button>
        </div>
    );
}
