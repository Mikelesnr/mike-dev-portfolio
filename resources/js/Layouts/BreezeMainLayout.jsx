import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import ChatWidget from "../Components/ChatWidget";

export default function BreezeMainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            {/* Custom Navbar that handles dynamic login/logout tabs */}
            <NavBar />

            <main className="flex-grow">{children}</main>

            <Footer />

            {/* Keeps your custom global AI chat layer active across parallel tracks */}
            <ChatWidget />
        </div>
    );
}
