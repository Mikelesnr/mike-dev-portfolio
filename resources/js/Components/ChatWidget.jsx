import React, { useState, useRef, useEffect, useCallback } from "react";
import axios from "axios";

const INITIAL_MESSAGES = [
    {
        sender: "ai",
        text: "Hi there! I'm Michael's AI assistant. Ask me anything about his projects, technical skills, or deployment experience!",
    },
];

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const widgetRef = useRef(null);      // wraps toggle + panel — used for click-outside
    const toggleRef = useRef(null);      // the toggle button itself

    // ---------- Auto-scroll to bottom when messages change -----------------
    useEffect(() => {
        if (!isOpen) return;
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading, isOpen]);

    // ---------- Focus input when opening ----------------------------------
    useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => inputRef.current?.focus(), 180);
            return () => clearTimeout(t);
        }
    }, [isOpen]);

    // ---------- Click outside to close ------------------------------------
    // Only active on non-touch / wider screens. On mobile the widget is
    // usually expanded to full width, and accidental closes are annoying.
    useEffect(() => {
        if (!isOpen) return;
        if (typeof window === "undefined") return;

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        if (isMobile) return;

        const handleClickOutside = (e) => {
            if (
                widgetRef.current &&
                !widgetRef.current.contains(e.target)
            ) {
                setIsOpen(false);
            }
        };

        // mousedown fires before click, so we avoid the "open by click,
        // immediately close by same click" race condition.
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // ---------- Escape key to close ---------------------------------------
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === "Escape") {
                setIsOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [isOpen]);

    // ---------- Send a message --------------------------------------------
    const handleSendMessage = useCallback(
        async (e) => {
            e.preventDefault();
            const trimmed = inputMessage.trim();
            if (!trimmed || loading) return;

            const userMessage = { sender: "user", text: trimmed };
            const nextMessages = [...messages, userMessage];

            setMessages(nextMessages);
            setInputMessage("");
            setLoading(true);

            try {
                const response = await axios.post(
                    route("portfolio.chat"),
                    { message: trimmed }
                );

                if (response.data.success) {
                    setMessages([
                        ...nextMessages,
                        { sender: "ai", text: response.data.reply },
                    ]);
                } else {
                    // Endpoint responded but not with success — show friendly fallback
                    setMessages([
                        ...nextMessages,
                        {
                            sender: "ai",
                            text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later!",
                        },
                    ]);
                }
            } catch (error) {
                setMessages([
                    ...nextMessages,
                    {
                        sender: "ai",
                        text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later!",
                    },
                ]);
            } finally {
                setLoading(false);
            }
        },
        [inputMessage, loading, messages]
    );

    const handleToggle = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div
            className="chat-widget"
            ref={widgetRef}
            data-open={isOpen ? "true" : "false"}
        >
            {/* ---------- Panel --------------------------------------------- */}
            {isOpen && (
                <div
                    className="chat-panel"
                    role="dialog"
                    aria-label="Portfolio assistant"
                    aria-modal="false"
                >
                    <header className="chat-header">
                        <div className="chat-header-text">
                            <h4 className="chat-header-title">
                                Portfolio Assistant
                            </h4>
                            <span className="chat-header-sub">
                                Powered by Grok
                            </span>
                        </div>
                        <button
                            type="button"
                            className="chat-close-btn"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chat"
                        >
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 2 L12 12 M12 2 L2 12"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </header>

                    <div className="chat-body">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`chat-row chat-row-${msg.sender}`}
                            >
                                <div
                                    className={`chat-bubble chat-bubble-${msg.sender}`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {loading && (
                            <div className="chat-row chat-row-ai">
                                <div className="chat-bubble chat-bubble-ai chat-typing">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <form
                        onSubmit={handleSendMessage}
                        className="chat-footer"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask about Laravel, Docker, projects…"
                            className="chat-input"
                            disabled={loading}
                            aria-label="Message"
                        />
                        <button
                            type="submit"
                            className="chat-send-btn"
                            disabled={loading || !inputMessage.trim()}
                            aria-label="Send message"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                aria-hidden="true"
                            >
                                <path
                                    d="M2 8 L14 2 L10 8 L14 14 Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            {/* ---------- Toggle button ------------------------------------- */}
            <button
                ref={toggleRef}
                type="button"
                onClick={handleToggle}
                className="chat-toggle-btn"
                aria-label={isOpen ? "Close chat" : "Open chat"}
                aria-expanded={isOpen}
            >
                {isOpen ? (
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        aria-hidden="true"
                    >
                        <path
                            d="M3 3 L15 15 M15 3 L3 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                ) : (
                    <>
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M2 4.5C2 3.4 2.9 2.5 4 2.5H14C15.1 2.5 16 3.4 16 4.5V11.5C16 12.6 15.1 13.5 14 13.5H7L3 16.5V13.5H4C2.9 13.5 2 12.6 2 11.5V4.5Z"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="chat-toggle-label">
                            Ask My AI
                        </span>
                    </>
                )}
            </button>
        </div>
    );
}