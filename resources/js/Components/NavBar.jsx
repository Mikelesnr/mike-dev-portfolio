import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { component, props } = usePage();
    const auth = props.auth || { user: null };

    const handleToggle = () => setIsOpen(!isOpen);
    const isActive = (name) => component === name;

    // Small reusable component for the swoosh indicator.
    // Renders an SVG path underneath the link when active.
    const Swoosh = () => (
        <svg
            className="nav-swoosh"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <path
                d="M2 5 Q 25 1, 50 4 T 98 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link href="/" className="navbar-brand">
                    MyPortfolio
                </Link>
            </div>
            <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
                {/* ---------- Public ---------- */}
                <li className="nav-item">
                    <Link
                        href="/"
                        className={`nav-link ${isActive("Home") ? "active-link" : ""}`}
                    >
                        <span>Home</span>
                        <Swoosh />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href="/work"
                        className={`nav-link ${isActive("Work") ? "active-link" : ""}`}
                    >
                        <span>My Projects</span>
                        <Swoosh />
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        href="/contact"
                        className={`nav-link ${isActive("Contact") ? "active-link" : ""}`}
                    >
                        <span>Contact Me</span>
                        <Swoosh />
                    </Link>
                </li>

                {/* ---------- Auth-aware ---------- */}
                {auth.user ? (
                    <>
                        <li className="nav-item">
                            <Link
                                href={route("dashboard")}
                                className={`nav-link ${isActive("Dashboard") ? "active-link" : ""}`}
                                style={{ color: "var(--brass)" }}
                            >
                                <span>Admin Panel</span>
                                <Swoosh />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href={route("profile.edit")}
                                className={`nav-link ${isActive("Profile/Edit") ? "active-link" : ""}`}
                            >
                                <span>Profile Settings</span>
                                <Swoosh />
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="nav-link nav-logout"
                            >
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </>
                ) : (
                    <li className="nav-item">
                        <Link
                            href={route("login")}
                            className={`nav-link ${isActive("Auth/Login") ? "active-link" : ""}`}
                        >
                            <span>Admin Portal</span>
                            <Swoosh />
                        </Link>
                    </li>
                )}

                {/* ---------- Theme toggle (inside the group) ---------- */}
                <li className="nav-item nav-item-toggle">
                    <ThemeToggle />
                </li>
            </ul>

            <div
                className="navbar-toggle"
                id="mobile-menu"
                onClick={handleToggle}
                aria-label="Toggle navigation"
                aria-expanded={isOpen}
            >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    );
};

export default NavBar;