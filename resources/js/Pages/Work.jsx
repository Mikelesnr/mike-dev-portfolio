import React, { Component } from "react";

class Work extends Component {
    state = {};
    render() {
        return (
            <section id="Skills" className="section projects-section">
                <div className=" container container-skills">
                    <h2 className="body-h2">My Projects</h2>
                    <div className="content skills-content">
                        <div className="info project-info">
                            <h3 className="body-h3">
                                <a
                                    href="https://www.summitguesthouse.org/"
                                    target="blank"
                                >
                                    Summit Guesthouse
                                </a>
                            </h3>
                            <p className="body-p">
                                Website built for Summit guessthouse in
                                Beitbridge Zimbabwe.
                            </p>
                            <p>
                                Project built with Nextjs, Prisma Studio ORM and
                                MySql.
                            </p>
                            <p>
                                Project deployed on bare linux server with ssh
                                git prodution connection for updates.
                            </p>
                            <p>
                                Depolyed with Nginx Server and PM2 Restart Linux
                                script on server.
                            </p>
                            <div className="skill-category">
                                <iframe
                                    src="https://www.summitguesthouse.org/"
                                    class="custom-iframe"
                                    title="Summit Guesthouse"
                                ></iframe>
                            </div>
                        </div>
                        <div className="info project-info">
                            <h3 className="body-h3">
                                <a
                                    href="https://mikelesnr.github.io/wdd131/project/"
                                    target="blank"
                                >
                                    Gears For Hire
                                </a>
                            </h3>
                            <p className="body-p">
                                Website built for WDD 131 Final Project At
                                Brigham Young University.
                            </p>
                            <p>
                                Project built with Nextjs, Prisma Studio ORM and
                                MySql
                            </p>
                            <p>
                                Project deployed on bare linux server with ssh
                                git prodution connection for updates
                            </p>
                            <p>
                                Depolyed with Nginx Server and PM2 Restart Linux
                                script on server
                            </p>
                            <div className="skill-category">
                                <iframe
                                    src="https://mikelesnr.github.io/wdd131/project/"
                                    class="custom-iframe"
                                    title="Gears For Hire"
                                ></iframe>
                            </div>

                            <div className="buttons">
                                <a href="/contact" className="hire-btn btn">
                                    Hire Me
                                </a>
                                <a href="/" className="work-btn btn">
                                    Home
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Work;
