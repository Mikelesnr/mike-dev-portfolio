import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import NavBar from "@/Components/NavBar"; // Use your custom navbar inside the dashboard area!

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Styled explicitly around your custom dark theme tokens
    const authStyles = {
        pageBackground: {
            backgroundColor: "#0b1b18", // var(--div-color)
            backgroundImage: "var(--background-image-url)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            minHeight: "100 screen",
        },
        headerContainer: {
            backgroundColor: "rgba(11, 27, 24, 0.9)", // transparent var(--div-color)
            borderBottom: "1px solid #b6c9b6", // var(--btn-secondary)
            color: "var(--text-color)",
        },
    };

    return (
        <div style={authStyles.pageBackground}>
            {/* ⚡ Integrate your unified navbar at the absolute top of the auth panel */}
            <NavBar />

            {/* Dashboard Inner Context Sub-Header */}
            {header && (
                <header
                    style={authStyles.headerContainer}
                    className="shadow-lg backdrop-blur-md"
                >
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <div
                            className="text-xl font-bold uppercase tracking-wider"
                            style={{ color: "var(--btn-primary)" }}
                        >
                            {header}
                        </div>
                        <div className="text-xs font-mono text-gray-400">
                            Operator:{" "}
                            <span className="text-white font-bold">
                                {user.name}
                            </span>
                        </div>
                    </div>
                </header>
            )}

            {/* Core Workspace Output View */}
            <main className="min-h-[calc(100vh-140px)]">{children}</main>
        </div>
    );
}
