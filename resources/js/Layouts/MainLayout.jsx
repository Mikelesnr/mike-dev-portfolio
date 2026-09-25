import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import ChatWidget from "../Components/ChatWidget";

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <ChatWidget />
        </div>
    );
}
