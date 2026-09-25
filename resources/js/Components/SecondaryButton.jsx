import React from "react";

export default function SecondaryButton({
    type = "button",
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={`btn-secondary ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}