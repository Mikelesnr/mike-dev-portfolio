import React from "react";
import { usePage } from "@inertiajs/react";
import NavBar from "@/Components/NavBar";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="auth-page">
            <NavBar />

            {header && (
                <header className="auth-header">
                    <div className="auth-header-inner">
                        <div className="auth-header-title-wrap">
                            {header}
                        </div>
                        <div className="auth-header-user">
                            <span className="auth-header-user-label">
                                Operator
                            </span>
                            <span className="auth-header-user-name">
                                {user.name}
                            </span>
                        </div>
                    </div>
                </header>
            )}

            <main className="auth-main">{children}</main>
        </div>
    );
}