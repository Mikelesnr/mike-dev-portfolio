import React from "react";
import { Reveal } from "../../Hooks/useReveal";
import ValueCard from "./ValueCard";

const values = [
    {
        title: "One person, full ownership",
        description:
            "From database design to the interface your customers touch, I build and ship the whole thing myself — no handoffs, no lost context.",
    },
    {
        title: "Built for unreliable networks",
        description:
            "Mom&Pop POS keeps shops running through unstable connections using offline-first sync — the kind of resilience most web apps never have to think about.",
    },
    {
        title: "Real businesses, real stakes",
        description:
            "A guest house, a surveying practice, an organisation site — each one had to work correctly from day one, not just look good in a demo.",
    },
    {
        title: "Direct, responsive communication",
        description:
            "You're talking to the person actually writing the code, not a project manager relaying your feedback three days later.",
    },
];

export default function WhyChooseMe() {
    return (
        <section id="why-choose-me" className="section why-choose-me-section">
            <div className="container container-wide">
                <header className="section-header">
                    <h2 className="body-h2">Why Work With Me</h2>
                    <span className="section-underline" aria-hidden="true" />
                </header>

                <p className="ledger-stub">
                    <span>how I approach every build</span>
                </p>

                <div className="values-grid">
                    {values.map((value, i) => (
                        <Reveal
                            key={value.title}
                            className="value-card-wrap"
                            delay={0.05 + i * 0.08}
                            y={28}
                        >
                            <ValueCard
                                title={value.title}
                                description={value.description}
                                index={i + 1}
                            />
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.15} y={20}>
                    <div className="cta-banner">
                        <h3>Have a project in mind?</h3>
                        <p className="body-p">
                            Let&apos;s talk through what you need and whether
                            I&apos;m the right fit to build it.
                        </p>
                        <a href="/contact" className="btn hire-btn">
                            Start a Conversation
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}