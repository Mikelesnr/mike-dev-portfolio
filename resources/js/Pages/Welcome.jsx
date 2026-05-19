import React from "react";
import { Head } from "@inertiajs/react";
import BreezeMainLayout from "../Layouts/BreezeMainLayout";

export default function Welcome({ categories = [], introVideoUrl }) {
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
            <section className="about-section">
                <div className="about-container">
                    <div className="about-text text-box">
                        <h2>About Me</h2>
                        <p>
                            I am a passionate web developer with experience in building
                            modern web applications. I love learning new technologies and
                            solving complex programming problems.
                        </p>
                    </div>
                    <div className="about-video-container video-box">
                        {introVideoUrl ? (
                            <iframe
                                width="100%"
                                height="315"
                                src={introVideoUrl}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <p className="text-gray-500">No video URL configured.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* 🛠️ Skills Section */}
            <section className="skills-section">
                <div className="skills-container text-box">
                    <h2>My Skills</h2>
                    <div className="skills-grid">
                        <div className="skills-display">
                            {categories.map((category) => (
                                <div key={category.id} className="skill-category">
                                    <h3>{category.name}</h3>
                                    {category.skills &&
                                        category.skills.map((skill) => {
                                            const widthStyle = `${skill.percentage}%`;
                                            return (
                                                <div key={skill.id} className="skill-item">
                                                    <div
                                                        className="skill-name"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                        }}
                                                    >
                                                        <span>{skill.name}</span>
                                                        <span>{widthStyle}</span>
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

// Bind to your newly duplicated, Breeze-compatible layout pipeline
Welcome.layout = (page) => <BreezeMainLayout children={page} />;