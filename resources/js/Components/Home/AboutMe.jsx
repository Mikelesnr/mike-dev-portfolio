import React, { useState } from "react";
import { Reveal } from "../../Hooks/useReveal";

export default function AboutMe({ introVideoUrl }) {
    const [copied, setCopied] = useState(false);

    const email = "michael@michaelmwanza.site";

    const handleCopyEmail = async (e) => {
        // Purely an enhancement — the mailto: link still works if this fails
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch (_) {
            window.location.href = `mailto:${email}`;
        }
    };

    const facts = [
        {
            label: "Email",
            value: (
                <a
                    href={`mailto:${email}`}
                    className="about-fact-link"
                    onClick={handleCopyEmail}
                    title="Click to copy"
                >
                    {email}
                    <span className="about-fact-copy">
                        {copied ? "Copied ✓" : "Copy"}
                    </span>
                </a>
            ),
        },
        {
            label: "Based in",
            value: (
                <span className="about-fact-plain">
                    <span
                        className="about-fact-dot"
                        aria-hidden="true"
                    ></span>
                    Harare, Zimbabwe
                </span>
            ),
        },
        {
            label: "Résumé",
            value: (
                <a
                    href="/documents/mike-resume.pdf"
                    className="about-fact-download"
                    download
                >
                    Download CV
                    <span aria-hidden="true">↧</span>
                </a>
            ),
        },
    ];

    return (
        <section id="about-me" className="section about-me-section">
            <div className="container container-about">
                <header className="section-header">
                    <h2 className="body-h2">About Me</h2>
                    <span className="section-underline" aria-hidden="true" />
                </header>

                <div className="about-grid">
                    {/* ---------- Left — facts card -------------------- */}
                    <Reveal className="about-card-wrap" delay={0.05}>
                        <div className="info profile-info about-card">
                            <h3 className="body-h3 about-card-title">
                                Michael Mwanza
                            </h3>
                            <p className="about-card-sub">
                                Fullstack developer · Founder, Mom &amp; Pop POS
                            </p>

                            <ul className="about-facts">
                                {facts.map((f) => (
                                    <li key={f.label} className="about-fact">
                                        <span className="about-fact-label">
                                            {f.label}
                                        </span>
                                        <span className="about-fact-value">
                                            {f.value}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>

                    {/* ---------- Right — video ------------------------ */}
                    {introVideoUrl && (
                        <Reveal
                            className="about-video-wrap"
                            delay={0.15}
                            y={32}
                        >
                            <div className="about-video-frame">
                                <iframe
                                    className="about-video-iframe"
                                    src={introVideoUrl}
                                    title="Michael Mwanza - Profile Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <p className="about-video-caption">
                                A short intro — who I am and what I build.
                            </p>
                        </Reveal>
                    )}
                </div>
            </div>
        </section>
    );
}