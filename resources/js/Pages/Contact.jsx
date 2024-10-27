import React, { Component } from "react";

class Contact extends Component {
    state = {};
    render() {
        return (
            <section id="about-me" className="section contact-section">
                <div className="container container-about">
                    <h2 className="body-h2">Contact Me</h2>
                    <div className="content about-me-content">
                        <div className="info profile-info">
                            <h3 className="body-h3 ">Give Me A Shout</h3>
                            <form className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                    ></input>
                                    .
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                    ></input>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn-submit">
                                    Send Message
                                </button>
                            </form>
                            <div className="map-container">
                                {/* <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2010.5541837115932!2d31.10367575917551!3d-17.813406951183076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2szw!4v1729894702590!5m2!1sen!2szw"
                                    className="map-iframe"
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Contact;
