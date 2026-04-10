import { useMemo, useState } from "react";

export default function MessagePanel({
                                         selectedRequestId,
                                         messages,
                                         onSendMessage,
                                     }) {
    const [requestId, setRequestId] = useState(selectedRequestId || "");
    const [text, setText] = useState("");
    const [messageStatus, setMessageStatus] = useState("");

    const filteredMessages = useMemo(() => {
        if (!requestId) return messages;
        return messages.filter((message) => message.requestId === requestId);
    }, [messages, requestId]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedText = text.trim();

        if (!trimmedText) {
            setMessageStatus("Message field cannot be empty.");
            return;
        }

        if (trimmedText.length > 1000) {
            setMessageStatus("Message must not exceed 1000 characters.");
            return;
        }

        onSendMessage({
            requestId: requestId || "General",
            text: trimmedText,
        });

        setText("");
        setMessageStatus("Message sent successfully.");
    };

    return (
        <div className="card panel-card">
            <div className="section-header">
                <h2>Send Messages to Inventory Manager</h2>
            </div>

            <form className="form-grid" onSubmit={handleSubmit}>
                <div>
                    <label>Request ID</label>
                    <input
                        type="text"
                        value={requestId}
                        onChange={(e) => setRequestId(e.target.value)}
                        placeholder="REQ-001"
                    />
                </div>

                <div>
                    <label>Message</label>
                    <textarea
                        rows="5"
                        maxLength="1000"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your message here..."
                    />
                </div>

                <button className="btn btn-primary" type="submit">
                    Send Message
                </button>

                {messageStatus && <p className="status-success">{messageStatus}</p>}
            </form>

            <div className="thread">
                <h3>Conversation Thread</h3>

                <div className="stack">
                    {filteredMessages.length === 0 ? (
                        <p className="muted">No messages found for this request.</p>
                    ) : (
                        filteredMessages.map((item) => (
                            <div key={item.id} className="thread-item">
                                <strong>
                                    {item.sender} - Request: {item.requestId}
                                </strong>
                                <p>{item.text}</p>
                                <small>{item.timestamp}</small>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}