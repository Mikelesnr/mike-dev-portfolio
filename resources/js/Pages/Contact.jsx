import React, { useState } from "react";
import axios from "axios";
import { Head } from "@inertiajs/react";
import MainLayout from "../Layouts/MainLayout";

const EMAIL = "michael@michaelmwanza.site";
const WHATSAPP_NUMBER = "263773270659";
const PHONE_1 = "+263773270659";
const PHONE_2 = "+263717989439";
const LINKEDIN_URL = "https://www.linkedin.com/in/michael-mwanza-n"; // ⚠️ replace
const GITHUB_URL = "https://github.com/Mikelesnr";

const WHATSAPP_MESSAGE =
    "Hi Michael, I found your portfolio and I'd like to talk about a project.";

const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
)}`;

export default function Contact() {
    // ---------- Form state (identical shape to the original class) ---------
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        submitting: false,
        success: null,
        error: null,
    });

    // ---------- UI state -----------------------------------------------
    const [mode, setMode] = useState("form"); // "form" | "whatsapp"

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setForm((prev) => ({
            ...prev,
            submitting: true,
            success: null,
            error: null,
        }));

        const { name, email, message } = form;

        try {
            await axios.post(route("contact.submit"), {
                name,
                email,
                message,
            });

            setForm({
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
                errorMsg = Object.values(error.response.data.errors)
                    .flat()
                    .join(" ");
            }
            setForm((prev) => ({
                ...prev,
                submitting: false,
                success: false,
                error: errorMsg,
            }));
        }
    };

    const { name, email, message, submitting, success, error } = form;

    return (
        <>
            <Head>
                <title>Contact — Michael Mwanza</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon" />
            </Head>

            <section id="contact" className="section contact-section">
                <div className="container container-wide">
                    {/* ---------- Section header ------------------- */}
                    <header className="section-header">
                        <h2 className="body-h2">Let&apos;s talk</h2>
                        <span
                            className="section-underline"
                            aria-hidden="true"
                        />
                    </header>

                    <p className="section-lead">
                        Have a project, a question, or just want to say hi?
                        Pick whichever way you&apos;d rather get in touch.
                    </p>

                    {/* ---------- Two-column layout ---------------- */}
                    <div className="contact-grid">
                        {/* ============ LEFT — Form / WhatsApp ====== */}
                        <div className="contact-panel">
                            {/* Mode toggle */}
                            <div
                                className="contact-mode-toggle"
                                role="tablist"
                                aria-label="Choose contact method"
                            >
                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={mode === "form"}
                                    className={`contact-mode-btn ${mode === "form" ? "is-active" : ""
                                        }`}
                                    onClick={() => setMode("form")}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M2 3.5C2 2.7 2.7 2 3.5 2H12.5C13.3 2 14 2.7 14 3.5V10.5C14 11.3 13.3 12 12.5 12H6L3 14.5V12H3.5C2.7 12 2 11.3 2 10.5V3.5Z"
                                            stroke="currentColor"
                                            strokeWidth="1.4"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <span>Send a message</span>
                                </button>

                                <button
                                    type="button"
                                    role="tab"
                                    aria-selected={mode === "whatsapp"}
                                    className={`contact-mode-btn ${mode === "whatsapp" ? "is-active" : ""
                                        }`}
                                    onClick={() => setMode("whatsapp")}
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.6 5.94L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.47h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.44-8.43ZM12.07 21.8h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.23-.37a9.85 9.85 0 0 1-1.51-5.27c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99c0 5.45-4.44 9.89-9.9 9.89Z" />
                                    </svg>
                                    <span>WhatsApp</span>
                                </button>
                            </div>

                            {/* ---------- Form panel ------------------ */}
                            <div
                                className={`contact-mode-panel ${mode === "form" ? "is-active" : ""
                                    }`}
                                hidden={mode !== "form"}
                            >
                                <h3 className="body-h3 contact-panel-title">
                                    Send a message
                                </h3>
                                <p className="contact-panel-sub">
                                    Replies within 24 hours, Mon–Fri. Use this
                                    form for project briefs, quotes, or
                                    anything you&apos;d rather write down.
                                </p>

                                <form
                                    className="contact-form"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={handleChange}
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
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            rows="5"
                                            value={message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={submitting}
                                    >
                                        {submitting
                                            ? "Sending…"
                                            : "Send Message"}
                                    </button>

                                    {success && (
                                        <p className="success-msg">
                                            ✅ Message sent successfully!
                                        </p>
                                    )}
                                    {error && (
                                        <p className="error-msg">
                                            ❌ {error}
                                        </p>
                                    )}
                                </form>
                            </div>

                            {/* ---------- WhatsApp panel -------------- */}
                            <div
                                className={`contact-mode-panel ${mode === "whatsapp" ? "is-active" : ""
                                    }`}
                                hidden={mode !== "whatsapp"}
                            >
                                <h3 className="body-h3 contact-panel-title">
                                    Chat on WhatsApp
                                </h3>
                                <p className="contact-panel-sub">
                                    Fastest way to reach me. Typically replies
                                    within an hour during Harare business
                                    hours.
                                </p>

                                <div className="whatsapp-preview">
                                    <div className="whatsapp-preview-header">
                                        <span className="whatsapp-preview-dot" />
                                        <span>Your message will say</span>
                                    </div>
                                    <p className="whatsapp-preview-text">
                                        {WHATSAPP_MESSAGE}
                                    </p>
                                    <p className="whatsapp-preview-note">
                                        You can edit it before sending.
                                    </p>
                                </div>

                                <a
                                    href={whatsappHref}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="whatsapp-cta"
                                >
                                    <span className="whatsapp-cta-icon">
                                        <svg
                                            viewBox="0 0 24 24"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.6 5.94L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.47h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.44-8.43Z" />
                                        </svg>
                                    </span>
                                    <span>Open WhatsApp</span>
                                    <span
                                        className="whatsapp-cta-arrow"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
                                </a>

                                <p className="whatsapp-preview-note whatsapp-preview-note-below">
                                    No app installed? It&apos;ll open in your
                                    browser instead.
                                </p>
                            </div>
                        </div>

                        {/* ============ RIGHT — Direct contact ===== */}
                        <aside className="contact-aside">
                            <div className="contact-aside-header">
                                <span className="contact-aside-label">
                                    Or reach me directly
                                </span>
                                <p className="contact-aside-title">
                                    Prefer another channel?
                                </p>
                                <p className="contact-aside-sub">
                                    Everything here is checked daily. Pick
                                    whatever feels easiest.
                                </p>
                            </div>

                            <ul className="contact-methods">
                                <li>
                                    <a
                                        href={`mailto:${EMAIL}`}
                                        className="contact-method"
                                    >
                                        <span className="contact-method-icon">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <rect
                                                    x="2"
                                                    y="3.5"
                                                    width="12"
                                                    height="9"
                                                    rx="1.5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.4"
                                                />
                                                <path
                                                    d="M2.5 4.5 L8 8.5 L13.5 4.5"
                                                    stroke="currentColor"
                                                    strokeWidth="1.4"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </span>
                                        <span className="contact-method-body">
                                            <span className="contact-method-label">
                                                Email
                                            </span>
                                            <span className="contact-method-value">
                                                {EMAIL}
                                            </span>
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href={`tel:${PHONE_1}`}
                                        className="contact-method"
                                    >
                                        <span className="contact-method-icon">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M3.5 2.5h2l1 2.5-1.2 1c.5 1.2 1.3 2 2.5 2.5l1-1.2 2.5 1v2c0 .55-.45 1-1 1C6.5 12.3 3.7 9.5 3.5 3.5c0-.55.45-1 1-1Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.4"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <span className="contact-method-body">
                                            <span className="contact-method-label">
                                                Mobile
                                            </span>
                                            <span className="contact-method-value">
                                                +263 77 327 0659
                                            </span>
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href={`tel:${PHONE_2}`}
                                        className="contact-method"
                                    >
                                        <span className="contact-method-icon">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    d="M3.5 2.5h2l1 2.5-1.2 1c.5 1.2 1.3 2 2.5 2.5l1-1.2 2.5 1v2c0 .55-.45 1-1 1C6.5 12.3 3.7 9.5 3.5 3.5c0-.55.45-1 1-1Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.4"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <span className="contact-method-body">
                                            <span className="contact-method-label">
                                                Office
                                            </span>
                                            <span className="contact-method-value">
                                                +263 71 798 9439
                                            </span>
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href={whatsappHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-method contact-method-whatsapp"
                                    >
                                        <span className="contact-method-icon">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M20.52 3.48A11.94 11.94 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.6 5.94L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.47h.01c6.55 0 11.89-5.34 11.89-11.9 0-3.18-1.24-6.17-3.44-8.43Z" />
                                            </svg>
                                        </span>
                                        <span className="contact-method-body">
                                            <span className="contact-method-label">
                                                WhatsApp
                                            </span>
                                            <span className="contact-method-value">
                                                Fastest reply
                                            </span>
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href={LINKEDIN_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-method"
                                    >
                                        <span className="contact-method-icon">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M3.5 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM2.25 6h2.5v8h-2.5V6Zm4.25 0h2.4v1.1c.35-.6 1.2-1.3 2.5-1.3 2.5 0 3.1 1.65 3.1 3.8V14h-2.5V9.9c0-1-.02-2.3-1.4-2.3-1.4 0-1.6 1.1-1.6 2.2V14H6.5V6Z" />
                                            </svg>
                                        </span>
                                        <span className="contact-method-body">
                                            <span className="contact-method-label">
                                                LinkedIn
                                            </span>
                                            <span className="contact-method-value">
                                                Let&apos;s connect
                                            </span>
                                        </span>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href={GITHUB_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="contact-method"
                                    >
                                        <span className="contact-method-icon">
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 16 16"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                                            </svg>
                                        </span>
                                        <span className="contact-method-body">
                                            <span className="contact-method-label">
                                                GitHub
                                            </span>
                                            <span className="contact-method-value">
                                                Code &amp; projects
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            </ul>

                            <div className="contact-aside-note">
                                <span className="contact-aside-note-dot" />
                                <span>
                                    Based in Harare · Available across time
                                    zones
                                </span>
                            </div>
                        </aside>
                    </div>

                    {/* ---------- Map ------------------------------ */}
                    <div className="contact-map-section">
                        <div className="contact-map-frame">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2010.5541837115932!2d31.10367575917551!3d-17.813406951183076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2szw!4v1729894702590!5m2!1sen!2szw"
                                className="contact-map-iframe"
                                allowFullScreen=""
                                loading="lazy"
                                title="Michael Mwanza's location — Harare, Zimbabwe"
                            />
                            <div className="contact-map-overlay">
                                <span className="contact-map-pin" />
                                <span>Harare, Zimbabwe</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Contact.layout = (page) => <MainLayout children={page} />;