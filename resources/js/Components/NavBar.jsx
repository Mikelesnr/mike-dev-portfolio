import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { component, props } = usePage();
    // Safely extract auth to prevent errors if the user is a guest
    const auth = props.auth || { user: null };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const isActive = (name) => component === name;

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link href="/">MyPortfolio</Link>
            </div>

            <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
                {/* Public Routes */}
                <li>
                    <Link
                        href="/"
                        className={`nav-link ${isActive("Home") ? "active-link" : ""}`}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href="/work"
                        className={`nav-link ${isActive("Work") ? "active-link" : ""}`}
                    >
                        My Projects
                    </Link>
                </li>
                <li>
                    <Link
                        href="/contact"
                        className={`nav-link ${isActive("Contact") ? "active-link" : ""}`}
                    >
                        Contact Me
                    </Link>
                </li>

                {/* Authentication Logic */}
                {auth.user ? (
                    <>
                        {/* Admin Panel */}
                        <li>
                            <Link
                                href={route("dashboard")}
                                className={`nav-link ${isActive("Dashboard") ? "active-link" : ""}`}
                                style={{ color: "var(--btn-primary)" }}
                            >
                                Admin Panel
                            </Link>
                        </li>
                        {/* Profile Settings */}
                        <li>
                            <Link
                                href={route("profile.edit")}
                                className={`nav-link ${isActive("Profile/Edit") ? "active-link" : ""}`}
                            >
                                Profile Settings
                            </Link>
                        </li>
                        {/* Logout */}
                        <li>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="nav-link"
                                style={{ textAlign: "left", cursor: "pointer" }}
                            >
                                Log Out
                            </Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link
                            href={route("login")}
                            className={`nav-link ${isActive("Auth/Login") ? "active-link" : ""}`}
                        >
                            Admin Portal
                        </Link>
                    </li>
                )}
            </ul>

            <div
                className="navbar-toggle"
                id="mobile-menu"
                onClick={handleToggle}
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default NavBar;
