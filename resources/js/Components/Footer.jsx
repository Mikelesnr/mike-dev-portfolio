import React from "react";
import SocialLinks from "./SocialLinks";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <SocialLinks className="footer-social-links" />

                <p>Harare, Zimbabwe</p>
                <p>
                    <a
                        href="tel:+263773270659"
                        className="footer-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Tel: +263 77 327 0659
                    </a>
                </p>
                <p>
                    <a
                        href="tel:+263717989439"
                        className="footer-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Tel: +263 71 798 9439
                    </a>
                </p>
                <p>
                    Email:{" "}
                    <a
                        href="mailto:michael@michaelmwanza.site"
                        className="footer-link"
                    >
                        michael@michaelmwanza.site
                    </a>
                </p>
                <p>© {new Date().getFullYear()} Michael Mwanza</p>
            </div>
        </footer>
    );
};

export default Footer;
