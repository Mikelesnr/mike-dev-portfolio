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
                    <div className="into-container">
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
            <section id="about-me" class="section about-me-section">
                <div class="container container-about">
                    <h2 className="body-h2">About Me</h2>
                    <div className="content about-me-content">
                        <div class="info profile-info">
                            <h3 className="body-h3 ">Michael Mwanza</h3>
                            <p className="font-p">
                                <strong>Date of Birth:</strong> April 18, 1990
                            </p>
                            <p className="font-p">
                                <strong>Email:</strong>{" "}
                                <a href="mailto:mwanza.n.m@gmail.com">
                                    mwanza.n.m@gmail.com
                                </a>
                            </p>
                            <p className="font-p">
                                <strong>Address:</strong> 3 Alexander Road,
                                Highlands, Harare
                            </p>
                            <a
                                href="documents/mike-resume.pdf"
                                class="btn btn-download-cv"
                                download
                            >
                                Download CV
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section id="Skills" class="section skills-section">
                <div class=" container container-skills">
                    <h2 className="body-h2">Skills</h2>
                    <div className="content skills-content">
                        <div className="info skills-info">
                            <h3 className="body-h3">Skills List</h3>
                            <p className="font-p">
                                <strong>Date of Birth:</strong> April 18, 1990
                            </p>
                            <p className="font-p">
                                <strong>Email:</strong>{" "}
                                <a href="mailto:mwanza.n.m@gmail.com">
                                    mwanza.n.m@gmail.com
                                </a>
                            </p>
                            <p className="font-p">
                                <strong>Address:</strong> 3 Alexander Road,
                                Highlands, Harare
                            </p>
                            <a
                                href="path/to/your/cv.pdf"
                                class="btn btn-projects"
                                download
                            >
                                projects
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
