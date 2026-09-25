import React from "react";
import { Reveal } from "../../Hooks/useReveal";
import SocialLinks from "../SocialLinks";
import TimezoneBadge from "./TimezoneBadge";

export default function Hero() {
    return (
        <section className="header">
            <div className="hero">
                <div className="into-container gradient-background">
                    <Reveal delay={0}>
                        <p className="hero-eyebrow">Hello!</p>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <h1 className="myh1">I&apos;m Michael Mwanza</h1>
                    </Reveal>

                    <Reveal delay={0.16}>
                        <h2>Fullstack Web Developer, based in Harare, Zimbabwe</h2>
                    </Reveal>

                    <Reveal delay={0.22}>
                        <p className="hero-client-line">
                            I build web products that grow small businesses —
                            from the first line of code to the last deployment.
                        </p>
                    </Reveal>

                    <Reveal delay={0.28}>
                        <p className="hero-tagline">
                            I design, build and ship full products end to end —
                            currently building an offline-first POS platform
                            for small businesses across Zimbabwe and SADC.
                        </p>
                    </Reveal>

                    <Reveal delay={0.34}>
                        <TimezoneBadge />
                    </Reveal>

                    <Reveal delay={0.4}>
                        <div className="buttons">
                            <a href="/contact" className="hire-btn btn">
                                Hire Me
                            </a>
                            <a href="/work" className="work-btn btn">
                                My Work
                            </a>
                        </div>
                    </Reveal>

                    <Reveal delay={0.46}>
                        <SocialLinks className="hero-social-links" />
                    </Reveal>

                    <Reveal delay={0.52}>
                        <a href="#Skills" className="hero-dev-link">
                            for developers <span aria-hidden="true">↓</span>
                        </a>
                    </Reveal>
                </div>

                <div className="profile-image-container">
                    <Reveal delay={0.2} className="profile-image-wrap" y={32}>
                        <img
                            src="/images/profile1.jpg"
                            alt="Michael Mwanza"
                            className="profile-image"
                        />
                    </Reveal>
                </div>
            </div>
        </section>
    );
}