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

                {/* Removed the 'content' class to fix the vertical stacking issue */}
                <div className="skills-content">
                    {categories.map((category) => (
                        <div className="skill-category" key={category.id}>
                            <h3>{category.name}</h3>
                            {category.skills?.map((skill) => (
                                <SkillCard key={skill.id} skill={skill} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
