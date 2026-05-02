import './App.css';
import React, { useState, useEffect } from 'react';

function Inventory() {
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/inventoryStaffDB")
      .then(res => res.json())
      .then(data => setInventoryData(data));
  }, []);


  const [selectedDept, setSelectedDept] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const displayData = inventoryData.filter(item => {
    return (
      (item.dept?.trim().toLowerCase() === selectedDept?.trim().toLowerCase()) &&
      (searchQuery === "" || item.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (stockFilter === "" ||
        (stockFilter === "low" && item.stock <= 5) ||
        (stockFilter === "high" && item.stock > 5) ||
        (stockFilter === "expired" && item.expiry === "Expired")
      )
    );


  });
    const alerts = inventoryData
      .filter(item => item.dept === selectedDept)
      .filter(item => item.stock < 10)
      .map(item => ({
        id: item.itemId,
        message: `Low stock: ${item.name} (${item.stock})`
      }));
      const expiredAlerts = inventoryData
  .filter(item => item.dept === selectedDept)
  .filter(item => new Date(item.expiry) < new Date())
  .map(item => ({
    id: item.itemId,
    message: `Expired item: ${item.name} (expired on ${item.expiry})`
  }));

  return (
    <div className="inventory">
   {selectedDept !== "" && (
  <div className="notes-container">

    {expiredAlerts.length > 0 &&
      expiredAlerts.map(alert => (
        <div key={alert.id} className="note expired">
          🚫 {alert.message}
        </div>
      ))
    }

    {inventoryData
      .filter(item => item.dept === selectedDept)
      .filter(item => item.stock < 10)
      .map(item => (
        <div key={item.itemId} className="note low-stock">
          ⚠️ Low stock: {item.name} ({item.stock})
        </div>
      ))
    }

    {expiredAlerts.length === 0 &&
      inventoryData.filter(item => item.dept === selectedDept).length > 0 &&
      <p>No alerts</p>
    }

  </div>
)}

      <div className="filter-section">
        <select
          className="search-select"
          value={selectedDept}
          onChange={(e) => {
            setSelectedDept(e.target.value);
            setSearchQuery("");
            setStockFilter("");
          }}
        >
          <option value="">-- Select a Department --</option>
          <option value="ph">Pharmacy</option>
          <option value="r">Radiology</option>
          <option value="bb">Blood Bank</option>
          <option value="icu">ICU</option>
        </select>

        {selectedDept !== "" && (
          <>
            <div className="search-form">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <select
                className="search-select"
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="">All Stock</option>
                <option value="low">Low Stock (≤ 5)</option>
                <option value="high">High Stock (&gt; 5)</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </>
        )}
      </div>

      {selectedDept !== "" ? (
        displayData.length > 0 ? (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Stock</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {displayData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className="stock-val">{item.stock}</td>
                    <td>{item.expiry}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No items match your filters.</p>
        )
      ) : (
        <p>Please select a department first.</p>
      )}
    </div>
  );
}

export default Inventory;