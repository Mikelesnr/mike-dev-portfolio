import React from "react";

export default function InputError({ message, className = "", ...props }) {
    if (!message) return null;

    return (
        <p {...props} className={`input-error ${className}`}>
            {message}
        </p>
    );
}