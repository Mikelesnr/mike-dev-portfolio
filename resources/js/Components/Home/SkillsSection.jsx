import React from "react";
import SkillCard from "./SkillCard";

export default function SkillsSection({ categories }) {
    return (
        <section id="Skills" className="section skills-section">
            <div className="container container-skills">
                <h2 className="body-h2">Skills</h2>
                <p className="ledger-stub">
                    <span>proven on real builds</span>
                </p>
                <div className="content skills-content">
                    {categories.map((category) => (
                        <div className="skill-category" key={category.id}>
                            <h3>{category.name}</h3>
                            {category.skills?.map((skill) => (
                                <SkillCard key={skill.id} skill={skill} />
                            ))}
                        </div>
                    ))}
                </div>
                <a href="/work" className="btn btn-projects">
                    See the Projects
                </a>
            </div>
        </section>
    );
}
