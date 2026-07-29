import React from "react";
import SocialLinks from "../SocialLinks";

export default function Hero() {
    return (
        <section className="header">
            <div className="hero">
                <div className="into-container gradient-background">
                    <p>Hello!</p>
                    <h1 className="myh1">I'm Michael Mwanza</h1>
                    <h2>Fullstack Web Developer, based in Harare, Zimbabwe</h2>
                    <p className="hero-tagline">
                        I design, build and ship full products end to end,
                        currently building an offline-first POS platform for
                        small businesses across Zimbabwe and SADC.
                    </p>
                    <div className="buttons">
                        <a href="/contact" className="hire-btn btn">
                            Hire Me
                        </a>
                        <a href="/work" className="work-btn btn">
                            My Work
                        </a>
                    </div>
                    <SocialLinks className="hero-social-links" />
                </div>
                <div className="profile-image-container">
                    <img
                        src="/images/profile.jpeg"
                        alt="Michael Mwanza"
                        className="profile-image"
                    />
                </div>
            </div>
        </section>
    );
}
