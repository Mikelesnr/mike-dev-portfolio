import React from "react";

export default function DangerButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`btn-danger ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}