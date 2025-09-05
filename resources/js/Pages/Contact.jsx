import { Component } from "react";
import axios from "axios";
import MainLayout from "../Layouts/MainLayout";

class Contact extends Component {
    state = {
        name: "",
        email: "",
        message: "",
        submitting: false,
        success: null,
        error: null,
    };

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ submitting: true, success: null, error: null });

        const { name, email, message } = this.state;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/contact`,
                { name, email, message }
            );

            this.setState({
                name: "",
                email: "",
                message: "",
                submitting: false,
                success: true,
                error: null,
            });
        } catch (error) {
            let errorMsg = "Something went wrong. Please try again.";
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors)
                    .flat()
                    .join(" ");
                errorMsg = errors;
            }
            this.setState({
                submitting: false,
                success: false,
                error: errorMsg,
            });
        }
    };

    render() {
        const { name, email, message, submitting, success, error } = this.state;

        return (
            <section id="about-me" className="section contact-section">
                <div className="container container-about">
                    <h2 className="body-h2">Contact Me</h2>
                    <div className="content about-me-content">
                        <div className="info profile-info">
                            <h3 className="body-h3">Give Me A Shout</h3>
                            <form
                                className="contact-form"
                                onSubmit={this.handleSubmit}
                            >
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={name}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={message}
                                        onChange={this.handleChange}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn-submit"
                                    disabled={submitting}
                                >
                                    {submitting ? "Sending..." : "Send Message"}
                                </button>

                                {success && (
                                    <p className="success-msg">
                                        ✅ Message sent successfully!
                                    </p>
                                )}
                                {error && (
                                    <p className="error-msg">❌ {error}</p>
                                )}
                            </form>

                            <div className="map-container">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2010.5541837115932!2d31.10367575917551!3d-17.813406951183076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2szw!4v1729894702590!5m2!1sen!2szw"
                                    className="map-iframe"
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Contact;

Contact.layout = (page) => <MainLayout children={page} />;
