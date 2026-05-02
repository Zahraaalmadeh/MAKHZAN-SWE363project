import "./App.css";
import { useState, useEffect } from "react";

function AddRequest() {
  const [currentStaff, setCurrentStaff] = useState(null);

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [priority, setPriority] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // get logged-in staff from system (localStorage)
  useEffect(() => {
    const staff = JSON.parse(localStorage.getItem("staff"));
    setCurrentStaff(staff);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentStaff) {
      setMessage("No staff session found");
      return;
    }

    if (!priority) {
      setMessage("Please select priority");
      return;
    }

    const payload = {
      staffId: currentStaff._id,
      staffName: currentStaff.name,
      department: currentStaff.department,

      itemName: itemName,
      quantity: Number(quantity),
      priority: priority
    };

    try {
      const res = await fetch("http://localhost:3000/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      await res.json();

      setMessage("Request created successfully");

      // reset form
      setItemName("");
      setQuantity(1);
      setPriority("");

      setTimeout(() => setMessage(""), 3000);

    } catch (err) {
      setMessage("Error sending request");
    }
  };

  return (
    <div className="add-request-container">
      <form className="add-request-form" onSubmit={handleSubmit}>
        <h2>Add New Request</h2>

        {/* Optional: show logged-in staff */}
        {currentStaff && (
          <p>
            Logged in as: <strong>{currentStaff.name}</strong> ({currentStaff.department})
          </p>
        )}

        {/* Item Name */}
        <label>Item Name:</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />

        {/* Quantity */}
        <label>Quantity:</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        {/* Priority */}
        <label>Priority:</label>
        <div className="dropdown">
          <button type="button" onClick={() => setOpen(!open)}>
            {priority || "Select priority"}
          </button>

          {open && (
            <div className="dropdown-menu">
              <div onClick={() => { setPriority("High"); setOpen(false); }}>High</div>
              <div onClick={() => { setPriority("Medium"); setOpen(false); }}>Medium</div>
              <div onClick={() => { setPriority("Low"); setOpen(false); }}>Low</div>
            </div>
          )}
        </div>

        <button type="submit">Submit</button>

        {message && <div className="alert-box">{message}</div>}
      </form>
    </div>
  );
}

export default AddRequest;

