import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

export default function MainLayout({ children }) {
    return (
        <>
            <NavBar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
