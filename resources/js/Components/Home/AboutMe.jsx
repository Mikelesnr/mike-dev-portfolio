import React from "react";

export default function AboutMe({ introVideoUrl }) {
    return (
        <section id="about-me" className="section about-me-section">
            <div className="container container-about">
                <h2 className="body-h2">About Me</h2>
                <div
                    className="content about-me-content"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "30px",
                    }}
                >
                    <div className="info profile-info">
                        <h3 className="body-h3">Michael Mwanza</h3>
                        <p className="font-p">
                            <strong>Email:</strong>{" "}
                            <a
                                className="bg-light-a"
                                href="mailto:michael@michaelmwanza.site"
                            >
                                michael@michaelmwanza.site
                            </a>
                        </p>
                        <p className="font-p">
                            <strong>Based in:</strong> Harare, Zimbabwe
                        </p>
                        <a
                            href="/documents/mike-resume.pdf"
                            className="btn btn-download-cv"
                            download
                        >
                            Download CV
                        </a>
                    </div>

                    {introVideoUrl && (
                        <div
                            className="about-video-container"
                            style={{
                                width: "100%",
                                maxWidth: "800px",
                                margin: "0 auto",
                            }}
                        >
                            <div
                                style={{
                                    position: "relative",
                                    paddingBottom: "56.25%",
                                    height: 0,
                                    overflow: "hidden",
                                    borderRadius: "14px",
                                    border: "1px solid var(--hairline)",
                                }}
                            >
                                <iframe
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        border: 0,
                                    }}
                                    src={introVideoUrl}
                                    title="Michael Mwanza - Profile Video"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
