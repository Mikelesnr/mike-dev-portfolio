import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { component, props } = usePage();
    const auth = props.auth || { user: null }; // Guard against missing auth objects smoothly

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

                {/* 🛡️ Breeze Authentication Links Dynamic Inclusion */}
                {auth.user ? (
                    <>
                        <li>
                            <Link
                                href={route("dashboard")}
                                className={`nav-link ${isActive("Dashboard") ? "active-link" : ""}`}
                                style={{ color: "var(--btn-primary)" }}
                            >
                                Admin Panel
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="nav-link"
                                style={{ textAlign: "left", cursor: "pointer" }}
                            >
                                Log Out ({auth.user.name})
                            </Link>
                        </li>
                    </>
                ) : (
                    <li>
                        <Link
                            href={route("login")}
                            className={`nav-link ${isActive("Auth/Login") ? "active-link" : ""}`}
                        >
                            Log In
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
