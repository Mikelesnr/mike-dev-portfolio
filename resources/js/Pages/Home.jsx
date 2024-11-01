import React from "react";
import { Head } from "@inertiajs/react";

const Home = () => {
    return (
        <>
            <Head>
                <title>Mike Dev Portfolio</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>
            <section className="header">
                <div className="hero">
                    <div className="into-container gradient-background">
                        <p>Hello!</p>
                        <h1 className="myh1">I'm Michael Mwanza</h1>
                        <h2>Fullstack Web Developer</h2>
                        <div className="buttons">
                            <a href="/contact" className="hire-btn btn">
                                Hire Me
                            </a>
                            <a href="/work" className="work-btn btn">
                                My Work
                            </a>
                        </div>
                    </div>
                    <div className="profile-image-container">
                        <img
                            src="images/profile.png"
                            alt=""
                            className="profile-image"
                        />
                    </div>
                </div>
            </section>
            <br />
            <section id="about-me" className="section about-me-section">
                <div className="container container-about">
                    <h2 className="body-h2">About Me</h2>
                    <div className="content about-me-content">
                        <div className="info profile-info">
                            <h3 className="body-h3 ">Michael Mwanza</h3>
                            <p className="font-p">
                                <strong>Date of Birth:</strong> April 18, 1990
                            </p>
                            <p className="font-p">
                                <strong>Email:</strong>{" "}
                                <a
                                    className="bg-light-a"
                                    href="mailto:mwanza.n.m@gmail.com"
                                >
                                    mwanza.n.m@gmail.com
                                </a>
                            </p>
                            <p className="font-p">
                                <strong>Address:</strong> 3 Alexander Road,
                                Highlands, Harare
                            </p>
                            <a
                                href="documents/mike-resume.pdf"
                                className="btn btn-download-cv"
                                download
                            >
                                Download CV
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="Skills" className="section skills-section">
                <div className=" container container-skills">
                    <h2 className="body-h2">Skills</h2>
                    <div className="content skills-content">
                        <div className="info skills-info">
                            <h3 className="body-h3">My Skills</h3>
                            <div className="skill-category">
                                <h3>Languages</h3>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "100%" }}
                                    >
                                        <span>HTML</span>
                                        <span>100%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "100%" }}
                                    ></div>
                                </div>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "90%" }}
                                    >
                                        <span>CSS</span>
                                        <span>90%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "90%" }}
                                    ></div>
                                </div>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "95%" }}
                                    >
                                        <span>JavaScript</span>
                                        <span>95%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "95%" }}
                                    ></div>
                                </div>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "85%" }}
                                    >
                                        <span>PHP</span>
                                        <span>85%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "85%" }}
                                    ></div>
                                </div>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "90%" }}
                                    >
                                        <span>Pyhon</span>
                                        <span>90%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "90%" }}
                                    ></div>
                                </div>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "90%" }}
                                    >
                                        <span>MySQL</span>
                                        <span>90%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "90%" }}
                                    ></div>
                                </div>
                            </div>
                            <div className="skill-category">
                                <h3>Frameworks</h3>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "85%" }}
                                    >
                                        <span>React</span>
                                        <span>85%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "85%" }}
                                    ></div>
                                </div>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "85%" }}
                                    >
                                        <span>Laravel</span>
                                        <span>85%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "85%" }}
                                    ></div>
                                </div>
                            </div>
                            <div className="skill-category">
                                <h3>DevOps</h3>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "95%" }}
                                    >
                                        <span>Linux</span>
                                        <span>95%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "95%" }}
                                    ></div>
                                </div>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "90%" }}
                                    >
                                        <span>Git</span>
                                        <span>90%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "90%" }}
                                    ></div>
                                </div>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "85%" }}
                                    >
                                        <span>Nginx</span>
                                        <span>85%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "85%" }}
                                    ></div>
                                </div>
                                <div className="skill">
                                    <div
                                        className="skill-span"
                                        style={{ width: "100%" }}
                                    >
                                        <span>MySQL Server</span>
                                        <span>100%</span>
                                    </div>
                                    <div
                                        className="skill-bar"
                                        style={{ width: "100%" }}
                                    ></div>
                                </div>
                            </div>
                            <a href="/work" className="btn btn-projects">
                                Projects
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
