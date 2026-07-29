import React from "react";
import { Head } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";
import Hero from "../Components/Home/Hero";
import AboutMe from "../Components/Home/AboutMe";
import SkillsSection from "../Components/Home/SkillsSection";
import FeaturedProjects from "../Components/Home/FeaturedProjects";
import WhyChooseMe from "../Components/Home/WhyChooseMe";
import CustomersSection from "../Components/Home/CustomersSection";

export default function Home({
    categories = [],
    featuredProjects = [],
    customers = [],
    introVideoUrl,
}) {
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
            <FeaturedProjects projects={featuredProjects} />
            <WhyChooseMe />
            <CustomersSection customers={customers} />
        </>
    );
}

Home.layout = (page) => <MainLayout children={page} />;
