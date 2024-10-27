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
                            <button className="hire-btn btn">Hire Me</button>
                            <button className="work-btn btn">My Work</button>
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
            <section className="about-section">
                <div></div>
            </section>
        </>
    );
};

export default Home;
