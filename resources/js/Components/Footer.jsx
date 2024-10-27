import React from "react";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p>Address: 3 Alexander Road, Highlands, Harare, Zimbabwe</p>
                <p>
                    <a
                        href="tel:+263773270659"
                        className="footer-link"
                        target="blank"
                    >
                        Tel: +263773270659
                    </a>
                </p>
                <p>
                    <a
                        href="tel:+263717989439"
                        className="footer-link"
                        target="blank"
                    >
                        Tel: +263717989439
                    </a>
                </p>
                <p>
                    Email:{" "}
                    <a
                        href="mailto:mwanza.m.n@gmail.com"
                        className="footer-link"
                        target="blank"
                    >
                        mwanza.m.n@gmail.com
                    </a>
                </p>
                <p>
                    LinkedIn:{" "}
                    <a
                        href="https://www.linkedin.com/in/michael-mwanza-n"
                        className="footer-link"
                        target="blank"
                    >
                        https://www.linkedin.com/in/michael-mwanza-n
                    </a>
                </p>
                <p>© 2024 Michael Mwanza</p>
            </div>
        </footer>
    );
};

export default Footer;
