import React from "react";
import { Link } from "@inertiajs/react";
import NavBar from "@/Components/NavBar"; // Integrate your uniform navigation layer

export default function GuestLayout({ children }) {
    // Exact style mappings pulling from your custom portfolio design system
    const guestStyles = {
        pageBackground: {
            backgroundColor: "#0b1b18", // var(--div-color)
            backgroundImage: "var(--background-image-url)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "col",
        },
        cardContainer: {
            backgroundColor: "#0b1b18", // var(--div-color)
            color: "#c3e6dd", // var(--text-color)
            border: "1px solid #b6c9b6", // var(--btn-secondary)
            borderRadius: "15px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
        },
        logoText: {
            fontFamily: '"Merriweather", serif',
            color: "#d9ee60", // var(--btn-primary)
            fontSize: "24px",
            fontWeight: "bold",
            letterSpacing: "1px",
        },
    };

    return (
        <div style={guestStyles.pageBackground} className="flex flex-col">
            {/* ⚡ Custom unified header navbar so users can jump back to Home, Work, or Contact easily */}
            <NavBar />

            {/* Centralized Authentication Card Form Layout */}
            <div className="flex flex-grow flex-col items-center justify-center pt-6 px-4 sm:pt-0">
                <div className="mb-4 text-center">
                    <Link href="/">
                        <span
                            style={guestStyles.logoText}
                            className="hover:opacity-80 transition duration-150"
                        >
                            MYPORTFOLIO // GATEWAY
                        </span>
                    </Link>
                </div>

                <div
                    style={guestStyles.cardContainer}
                    className="mt-4 w-full overflow-hidden px-8 py-8 sm:max-w-md sm:rounded-xl backdrop-blur-sm bg-opacity-95"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
