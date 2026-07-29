import React from "react";

export default function Hero() {
    return (
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
                        src="/images/profile.jpeg"
                        alt="Michael Mwanza"
                        className="profile-image"
                    />
                </div>
            </div>
        </section>
    );
}
