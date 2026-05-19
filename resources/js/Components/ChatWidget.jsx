import { Component, createRef } from "react";
import axios from "axios";

class ChatWidget extends Component {
    state = {
        isOpen: false,
        inputMessage: "",
        messages: [
            {
                sender: "ai",
                text: "Hi there! I'm Michael's AI assistant. Ask me anything about his projects, technical skills, or deployment experience!",
            },
        ],
        loading: false,
    };

    messagesEndRef = createRef();

    componentDidUpdate(prevProps, prevState) {
        // Automatically scroll to the bottom of the chat box when a new message arrives
        if (
            prevState.messages.length !== this.state.messages.length ||
            prevState.loading !== this.state.loading
        ) {
            this.scrollToBottom();
        }
    }

    scrollToBottom = () => {
        this.messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    toggleChat = () => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
    };

    handleInputChange = (e) => {
        this.setState({ inputMessage: e.target.value });
    };

    handleSendMessage = async (e) => {
        e.preventDefault();
        const { inputMessage, messages, loading } = this.state;

        if (!inputMessage.trim() || loading) return;

        // Append user message to state and clear input field
        const updatedMessages = [
            ...messages,
            { sender: "user", text: inputMessage },
        ];
        this.setState({
            messages: updatedMessages,
            inputMessage: "",
            loading: true,
        });

        try {
            // Send request to our fine-tuned Laravel endpoint using Ziggy route mapping
            const response = await axios.post(route("portfolio.chat"), {
                message: inputMessage,
            });

            if (response.data.success) {
                this.setState({
                    messages: [
                        ...updatedMessages,
                        { sender: "ai", text: response.data.reply },
                    ],
                    loading: false,
                });
            }
        } catch (error) {
            this.setState({
                messages: [
                    ...updatedMessages,
                    {
                        sender: "ai",
                        text: "Sorry, I'm having trouble connecting to my brain right now. Please try again later!",
                    },
                ],
                loading: false,
            });
        }
    };

    render() {
        const { isOpen, inputMessage, messages, loading } = this.state;

        return (
            <div className="portfolio-chat-container" style={styles.container}>
                {/* Chat Toggle Button */}
                <button onClick={this.toggleChat} style={styles.toggleBtn}>
                    {isOpen ? "❌ Close Chat" : "💬 Ask My AI"}
                </button>

                {/* Chat Window Box */}
                {isOpen && (
                    <div style={styles.chatWindow}>
                        <div style={styles.chatHeader}>
                            <h4 style={{ margin: 0, fontSize: "16px" }}>
                                Portfolio Assistant
                            </h4>
                            <span style={{ fontSize: "11px", opacity: 0.8 }}>
                                Powered by Gemini
                            </span>
                        </div>

                        <div style={styles.chatBody}>
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.messageRow,
                                        justifyContent:
                                            msg.sender === "user"
                                                ? "flex-end"
                                                : "flex-start",
                                    }}
                                >
                                    <div
                                        style={{
                                            ...styles.messageBubble,
                                            backgroundColor:
                                                msg.sender === "user"
                                                    ? "#007bff"
                                                    : "#e9ecef",
                                            color:
                                                msg.sender === "user"
                                                    ? "#fff"
                                                    : "#333",
                                        }}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div
                                    style={{
                                        ...styles.messageRow,
                                        justifyContent: "flex-start",
                                    }}
                                >
                                    <div
                                        style={{
                                            ...styles.messageBubble,
                                            backgroundColor: "#e9ecef",
                                            color: "#666",
                                        }}
                                    >
                                        Thinking...
                                    </div>
                                </div>
                            )}
                            <div ref={this.messagesEndRef} />
                        </div>

                        <form
                            onSubmit={this.handleSendMessage}
                            style={styles.chatFooter}
                        >
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={this.handleInputChange}
                                placeholder="Ask about Laravel, Docker, projects..."
                                style={styles.chatInput}
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                style={styles.sendBtn}
                                disabled={loading}
                            >
                                Send
                            </button>
                        </form>
                    </div>
                )}
            </div>
        );
    }
}

// Inline CSS styles to keep things modular and instantly viewable
const styles = {
    container: {
        position: "fixed",
        bottom: "25px",
        right: "25px",
        zIndex: 9999,
        fontFamily: "Arial, sans-serif",
    },
    toggleBtn: {
        backgroundColor: "#1e293b",
        color: "#fff",
        border: "none",
        padding: "12px 20px",
        borderRadius: "30px",
        cursor: "pointer",
        fontWeight: "bold",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    },
    chatWindow: {
        width: "350px",
        height: "450px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        bottom: "60px",
        right: "0",
        overflow: "hidden",
    },
    chatHeader: {
        backgroundColor: "#1e293b",
        color: "#fff",
        padding: "15px",
        display: "flex",
        flexDirection: "column",
    },
    chatBody: {
        flex: 1,
        padding: "15px",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        backgroundColor: "#f8fafc",
    },
    messageRow: {
        display: "flex",
        width: "100%",
    },
    messageBubble: {
        maxWidth: "75%",
        padding: "10px 14px",
        borderRadius: "16px",
        fontSize: "14px",
        lineHeight: "1.4",
        whiteSpace: "pre-wrap",
    },
    chatFooter: {
        display: "flex",
        borderTop: "1px solid #e2e8f0",
        padding: "10px",
        backgroundColor: "#fff",
    },
    chatInput: {
        flex: 1,
        border: "1px solid #cbd5e1",
        borderRadius: "6px",
        padding: "8px 12px",
        fontSize: "14px",
        outline: "none",
    },
    sendBtn: {
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        marginLeft: "8px",
        padding: "8px 16px",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default ChatWidget;
