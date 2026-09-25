import React, { forwardRef, useEffect, useRef } from "react";

const TextInput = forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, [isFocused]);

    return (
        <input
            {...props}
            type={type}
            className={`text-input ${className}`}
            ref={input}
        />
    );
});

export default TextInput;