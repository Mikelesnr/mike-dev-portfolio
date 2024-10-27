import React, { useState } from "react";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">MyPortfolio</div>
            <ul className={`navbar-links ${isOpen ? "active" : ""}`}>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/skills">Skills</a>
                </li>
                <li>
                    <a href="/work">My Work</a>
                </li>
                <li>
                    <a href="/contact">Contact Me</a>
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
