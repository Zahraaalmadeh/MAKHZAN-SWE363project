import { useState } from "react";

export default function DeliveryEstimateForm({ request, onSave }) {
    const [estimatedDelivery, setEstimatedDelivery] = useState("");
    const [deliveryNotes, setDeliveryNotes] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (!estimatedDelivery) {
            setMessage("Please select a delivery date.");
            return;
        }

        const selectedDate = new Date(estimatedDelivery);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setMessage("Delivery date must not be in the past.");
            return;
        }

        const ninetyDaysLater = new Date();
        ninetyDaysLater.setDate(ninetyDaysLater.getDate() + 90);

        if (selectedDate > ninetyDaysLater) {
            setMessage("Please select a realistic delivery date.");
            return;
        }

        onSave({
            requestId: request.id,
            estimatedDelivery,
            deliveryNotes,
        });

        setMessage("Estimated delivery time saved successfully.");
    };

    return (
        <div className="form-block">
            <h4>Provide Estimated Delivery Time</h4>

            <label>Delivery Date</label>
            <input
                type="date"
                value={estimatedDelivery}
                onChange={(e) => setEstimatedDelivery(e.target.value)}
            />

            <label>Notes</label>
            <textarea
                rows="4"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                placeholder="Optional notes"
            />

            <button className="btn btn-primary" type="button" onClick={handleSubmit}>
                Save Delivery Estimate
            </button>

            {message && <p className="status-success">{message}</p>}
        </div>
    );
}