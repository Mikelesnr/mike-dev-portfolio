import React from "react";
import { Link } from "@inertiajs/react";
import SocialLinks from "./SocialLinks";

const Footer = () => {
    const year = new Date().getFullYear();

    // Prefilled WhatsApp message so the conversation opens with context
    const whatsappHref =
        "https://wa.me/263773270659" +
        "?text=" +
        encodeURIComponent(
            "Hi Michael, I found your portfolio and I'd like to talk about a project."
        );

    return (
        <footer className="footer">
            <div className="footer-container">
                {/* ---------- Top: 3-column grid -------------------------- */}
                <div className="footer-grid">
                    {/* Column 1 — Brand */}
                    <div className="footer-brand">
                        <Link href="/" className="footer-wordmark">
                            Michael Mwanza
                        </Link>
                        <p className="footer-tagline">
                            Fullstack developer building web products for
                            small businesses — designed, built and shipped end
                            to end.
                        </p>
                        <SocialLinks className="footer-social-links" />
                    </div>

                    {/* Column 2 — Contact */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Get in touch</h4>

                        <a
                            href="mailto:michael@michaelmwanza.site"
                            className="footer-link footer-link-block"
                        >
                            michael@michaelmwanza.site
                        </a>

                        <a
                            href="tel:+263773270659"
                            className="footer-link footer-link-block"
                        >
                            +263 77 327 0659
                        </a>

                        <a
                            href={whatsappHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-link"
                        >
                            <span className="whatsapp-badge" aria-hidden="true">
                                {/* WhatsApp glyph */}
                                <svg
                                    viewBox="0 0 24 24"
                                    width="14"
                                    height="14"
                                    fill="currentColor"
                                >
                                    <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.6 5.94L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.47h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.44-8.43ZM12.07 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.23-.37a9.85 9.85 0 0 1-1.51-5.27c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.9 9.89Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.19 5.07 4.47.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
                                </svg>
                            </span>
                            <span>Chat on WhatsApp</span>
                        </a>

                        <a
                            href="tel:+263717989439"
                            className="footer-link footer-link-block"
                        >
                            +263 71 798 9439
                        </a>
                    </div>

                    {/* Column 3 — Location */}
                    <div className="footer-col">
                        <h4 className="footer-col-title">Based in</h4>
                        <p className="footer-location">Harare, Zimbabwe</p>
                        <p className="footer-note">
                            Working with clients across Zimbabwe, SADC and
                            remotely worldwide.
                        </p>
                        <a href="#top" className="footer-back-top">
                            <span aria-hidden="true">↑</span> Back to top
                        </a>
                    </div>
                </div>

                {/* ---------- Bottom strip -------------------------------- */}
                <div className="footer-bottom">
                    <p className="footer-copy">
                        © {year} Michael Mwanza · Built in Harare
                    </p>
                    <p className="footer-copy footer-copy-mono">
                        Offline-first · Zimbabwe
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;