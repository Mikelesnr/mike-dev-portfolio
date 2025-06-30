import React, { Component } from "react";
import axios from "axios";

class Work extends Component {
    state = {
        projects: [],
        currentPage: 1,
        lastPage: 1,
    };

    componentDidMount() {
        this.fetchProjects(this.state.currentPage);
    }

    fetchProjects = async (page) => {
        try {
            const response = await axios.get(
                // `${VITE_APP_API_URL}/projects?page=${page}`
                `${import.meta.env.VITE_API_URL}/projects?page=${page}`
            );
            this.setState({
                projects: response.data.data,
                currentPage: response.data.current_page,
                lastPage: response.data.last_page,
            });
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    handlePageChange = (page) => {
        this.fetchProjects(page);
    };

    render() {
        const { projects, currentPage, lastPage } = this.state;

        return (
            <section id="Skills" className="section projects-section">
                <div className="container container-skills">
                    <h2 className="body-h2">My Projects</h2>
                    <div
                        className="content skills-content"
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        {Array.isArray(projects) &&
                            projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="info project-info"
                                >
                                    <h3 className="body-h3">
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {project.name}
                                        </a>
                                    </h3>
                                    <p className="body-p">
                                        <strong>Description: </strong>{" "}
                                        {project.description}
                                    </p>
                                    <p>
                                        <strong>Tech Stack: </strong>{" "}
                                        {project.techstack}
                                    </p>
                                    <p>
                                        <strong>Deployment: </strong>{" "}
                                        {project.deployment}
                                    </p>
                                    <div>
                                        <iframe
                                            src={project.url}
                                            className="custom-iframe"
                                            title={project.name}
                                        ></iframe>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="pagination buttons">
                        <button
                            onClick={() =>
                                this.handlePageChange(currentPage - 1)
                            }
                            disabled={currentPage === 1}
                            className="btn btn-projects"
                        >
                            Prev
                        </button>
                        <span>
                            Page {currentPage} of {lastPage}
                        </span>
                        <button
                            onClick={() =>
                                this.handlePageChange(currentPage + 1)
                            }
                            disabled={currentPage === lastPage}
                            className="btn btn-projects"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}

export default Work;
