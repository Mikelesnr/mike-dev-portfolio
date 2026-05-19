import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";

export default function Home({ categories = [], introVideoUrl }) {
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
                            src="images/profile.jpeg"
                            alt=""
                            className="profile-image"
                        />
                    </div>
                </div>
            </section>
            <br />

            {/* 📝 About Me Section with Integrated Video */}
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
                        {/* Profile Info Details Block */}
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

                        {/* 🎥 Embedded Video Player Inside About Box */}
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
                                        borderRadius: "12px",
                                        boxShadow:
                                            "0 10px 25px rgba(0,0,0,0.15)",
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

            <section id="Skills" className="section skills-section">
                <div className=" container container-skills">
                    <h2 className="body-h2">Skills</h2>
                    <div className="content skills-content">
                        <div className="info skills-info">
                            <h3 className="body-h3">My Skills</h3>

                            {categories.map((category) => (
                                <div
                                    className="skill-category"
                                    key={category.id}
                                >
                                    <h3>{category.name}</h3>

                                    {category.skills &&
                                        category.skills.map((skill) => {
                                            const widthStyle = `${skill.percentage}%`;
                                            return (
                                                <div
                                                    className="skill"
                                                    key={skill.id}
                                                >
                                                    <div
                                                        className="skill-span"
                                                        style={{
                                                            width: widthStyle,
                                                        }}
                                                    >
                                                        <span>
                                                            {skill.name}
                                                        </span>
                                                        <span>
                                                            {widthStyle}
                                                        </span>
                                                    </div>
                                                    <div
                                                        className="skill-bar"
                                                        style={{
                                                            width: widthStyle,
                                                        }}
                                                    ></div>
                                                </div>
                                            );
                                        })}
                                </div>
                            ))}

                            <a href="/work" className="btn btn-projects">
                                Projects
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Home.layout = (page) => <MainLayout children={page} />;
