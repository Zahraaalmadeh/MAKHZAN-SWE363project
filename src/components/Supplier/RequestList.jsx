function getBadgeClass(status) {
    return String(status).toLowerCase().replace(/\s+/g, "-");
}

export default function RequestList({ requests, selectedRequestId, onSelect }) {
    return (
        <div className="stack">
            {requests.length === 0 ? (
                <p className="muted">No assigned requests found.</p>
            ) : (
                requests.map((request) => (
                    <div
                        key={request.id}
                        className={`request-item request-card ${
                            selectedRequestId === request.id ? "selected-card" : ""
                        }`}
                    >
                        <div className="request-card-top">
                            <strong>
                                {request.id} - {request.product}
                            </strong>

                            <span className={`badge ${getBadgeClass(request.status)}`}>
                                {request.status}
                            </span>
                        </div>

                        <div className="request-meta">
                            <p><span>Department:</span> {request.department}</p>
                            <p><span>Quantity:</span> {request.quantity}</p>
                            <p><span>Urgency:</span> {request.urgency}</p>
                            <p><span>Request Date:</span> {request.requestDate}</p>
                        </div>

                        <div className="item-actions">
                            <button
                                className="btn btn-outline"
                                onClick={() => onSelect(request.id)}
                            >
                                Open Request
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}