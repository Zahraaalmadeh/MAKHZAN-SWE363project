import { useState } from "react";

const allowedProgression = {
    New: ["Confirmed", "Shipped"],
    Pending: ["Confirmed", "Shipped"],
    "Under Review": ["Confirmed", "Shipped"],
    Confirmed: ["Shipped"],
    Shipped: ["Delivered"],
    Delivered: [],
};

export default function StatusUpdateForm({ request, onSave }) {
    const [status, setStatus] = useState("");
    const [trackingNumber, setTrackingNumber] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (!status) {
            setMessage("Please select a status.");
            return;
        }

        const validNextStatuses = allowedProgression[request.status] || [];
        if (!validNextStatuses.includes(status)) {
            setMessage(`Cannot mark ${status} directly from ${request.status}.`);
            return;
        }

        if (status === "Shipped") {
            const trimmed = trackingNumber.trim();
            const validTracking = /^[A-Za-z0-9-]{3,30}$/.test(trimmed);
            if (!validTracking) {
                setMessage("Please provide a valid tracking number.");
                return;
            }
        }

        onSave({
            requestId: request.id,
            status,
            trackingNumber: trackingNumber.trim(),
        });

        setMessage("Request status updated successfully.");
    };

    return (
        <div className="form-block">
            <h4>Update Supply Response Status</h4>

            <label>Status Update</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Select status</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
            </select>

            <label>Tracking Number</label>
            <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Required for shipped items"
            />

            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                Update Status
            </button>

            {message && <p className="status-success">{message}</p>}
        </div>
    );
}