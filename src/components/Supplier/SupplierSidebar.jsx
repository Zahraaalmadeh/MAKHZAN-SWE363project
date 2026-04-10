const tabs = [
    { key: "notifications", label: "Notifications" },
    { key: "requests", label: "Requests" },
    { key: "messages", label: "Messages" },
    { key: "documents", label: "Documents" },
];

export default function SupplierSidebar({ activeTab, onChangeTab }) {
    return (
        <aside className="card sidebar">
            <h3>Menu</h3>

            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    className={`nav-btn ${activeTab === tab.key ? "active" : ""}`}
                    onClick={() => onChangeTab(tab.key)}
                >
                    {tab.label}
                </button>
            ))}
        </aside>
    );
}