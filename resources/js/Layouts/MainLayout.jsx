import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import ChatWidget from "../Components/ChatWidget";

export default function MainLayout({ children }) {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />

            {/* 🌟 Integrate the ChatWidget globally */}
            <ChatWidget />
        </>
    );
}
