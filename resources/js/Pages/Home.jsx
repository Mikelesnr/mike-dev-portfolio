import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";
import Hero from "../Components/Home/Hero";
import AboutMe from "../Components/Home/AboutMe";
import SkillsSection from "../Components/Home/SkillsSection";

export default function Home({ categories = [], introVideoUrl }) {
    return (
        <>
            <Head>
                <title>Michael Mwanza — Fullstack Web Developer</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>

            <Hero />
            <br />
            <AboutMe introVideoUrl={introVideoUrl} />
            <SkillsSection categories={categories} />
        </>
    );
}

Home.layout = (page) => <MainLayout children={page} />;
