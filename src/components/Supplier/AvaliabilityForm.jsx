import { useState } from "react";

export default function AvailabilityForm({ request, onSave }) {
    const [availabilityStatus, setAvailabilityStatus] = useState("");
    const [availableQuantity, setAvailableQuantity] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (!availabilityStatus) {
            setMessage("Availability status is required.");
            return;
        }

        if (availabilityStatus === "Partially Available") {
            const numericValue = Number(availableQuantity);
            if (!availableQuantity || Number.isNaN(numericValue) || numericValue <= 0) {
                setMessage("Please enter a valid positive quantity.");
                return;
            }
        }

        onSave({
            requestId: request.id,
            availabilityStatus,
            availableQuantity:
                availabilityStatus === "Partially Available"
                    ? Number(availableQuantity)
                    : null,
        });

        setMessage("Availability response saved successfully.");
    };

    return (
        <div className="form-block">
            <h4>Confirm Product Availability</h4>

            <label>Availability Status</label>
            <select
                value={availabilityStatus}
                onChange={(e) => setAvailabilityStatus(e.target.value)}
            >
                <option value="">Select status</option>
                <option value="Available">Available</option>
                <option value="Partially Available">Partially Available</option>
                <option value="Not Available">Not Available</option>
            </select>

            <label>Available Quantity</label>
            <input
                type="number"
                min="1"
                value={availableQuantity}
                onChange={(e) => setAvailableQuantity(e.target.value)}
                placeholder="Required if partially available"
            />

            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                Submit Availability
            </button>

            {message && <p className="status-success">{message}</p>}
        </div>
    );
}