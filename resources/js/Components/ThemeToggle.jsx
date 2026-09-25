import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(
        () =>
            (typeof document !== "undefined" &&
                document.documentElement.getAttribute("data-theme")) ||
            "light"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        try {
            localStorage.setItem("theme", theme);
        } catch (e) {
            /* localStorage blocked — ignore */
        }
    }, [theme]);

    const next = theme === "light" ? "dark" : "light";

    return (
        <button
            type="button"
            onClick={() => setTheme(next)}
            className="theme-toggle"
            aria-label={`Switch to ${next} mode`}
            title={`Switch to ${next} mode`}
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
}