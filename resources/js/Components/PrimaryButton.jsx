import React from "react";

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`btn-primary ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}