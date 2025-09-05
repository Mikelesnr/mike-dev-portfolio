import React, { useState } from "react";
import { Link, usePage } from "@inertiajs/react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { component } = usePage(); // Inertia gives you the current page name

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
                        className={`nav-link ${
                            isActive("Home") ? "active-link" : ""
                        }`}
                    >
                        Home
                    </Link>
                </li>
                <li>
                    <Link
                        href="/work"
                        className={`nav-link ${
                            isActive("Work") ? "active-link" : ""
                        }`}
                    >
                        My Projects
                    </Link>
                </li>
                <li>
                    <Link
                        href="/contact"
                        className={`nav-link ${
                            isActive("Contact") ? "active-link" : ""
                        }`}
                    >
                        Contact Me
                    </Link>
                </li>
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
