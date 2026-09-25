import React from "react";
import { Link } from "@inertiajs/react";
import NavBar from "@/Components/NavBar";

export default function GuestLayout({ children }) {
    return (
        <div className="guest-page">
            <NavBar />

            <main className="guest-main">
                <div className="guest-brand-wrap">
                    <Link href="/" className="guest-brand">
                        <span className="guest-brand-primary">MYPORTFOLIO</span>
                        <span className="guest-brand-divider">//</span>
                        <span className="guest-brand-muted">GATEWAY</span>
                    </Link>
                </div>

                <div className="guest-card">{children}</div>
            </main>
        </div>
    );
}