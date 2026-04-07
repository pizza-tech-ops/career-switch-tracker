import { useState } from 'react';

function App() {
  const [applications, setApplications] = useState([
    { id: 1, company: "Example Corp", role: "Junior Web Dev", status: "Applied", date: "2026-04-05", notes: "Remote preferred" },
    { id: 2, company: "RemoteTech", role: "Full Stack Junior", status: "Interviewing", date: "2026-04-03", notes: "Peru relocation possible" }
  ]);
  const [newApp, setNewApp] = useState({ company: "", role: "", status: "Applied", notes: "" });
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("All");

  const addOrUpdateApplication = (e) => {
    e.preventDefault();
    if (!newApp.company || !newApp.role) return;

    if (editingId) {
      // Update existing
      setApplications(applications.map(app =>
        app.id === editingId ? { ...app, ...newApp } : app
      ));
      setEditingId(null);
    } else {
      // Add new
      setApplications([
        ...applications,
        { id: Date.now(), ...newApp, date: new Date().toISOString().split('T')[0] }
      ]);
    }
    setNewApp({ company: "", role: "", status: "Applied", notes: "" });
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  const startEdit = (app) => {
    setNewApp({ company: app.company, role: app.role, status: app.status, notes: app.notes || "" });
    setEditingId(app.id);
  };

  const filteredApps = filter === "All" 
    ? applications 
    : applications.filter(app => app.status === filter);

  // Simple stats
  const total = applications.length;
  const byStatus = {
    Applied: applications.filter(a => a.status === "Applied").length,
    Interviewing: applications.filter(a => a.status === "Interviewing").length,
    Offer: applications.filter(a => a.status === "Offer").length,
    Rejected: applications.filter(a => a.status === "Rejected").length,
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Career Switch Tracker</h1>
      <p style={{ color: "#666" }}>Built by me — 60-minute midnight sessions • Session 4</p>

      {/* Stats row */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        <div style={{ padding: "1rem", border: "1px solid #333", borderRadius: "8px", minWidth: "120px" }}>
          <strong>Total</strong><br />{total}
        </div>
        <div style={{ padding: "1rem", border: "1px solid #333", borderRadius: "8px", minWidth: "120px" }}>
          Applied: {byStatus.Applied}
        </div>
        <div style={{ padding: "1rem", border: "1px solid #333", borderRadius: "8px", minWidth: "120px" }}>
          Interviewing: {byStatus.Interviewing}
        </div>
        <div style={{ padding: "1rem", border: "1px solid #333", borderRadius: "8px", minWidth: "120px" }}>
          Offer: {byStatus.Offer}
        </div>
        <div style={{ padding: "1rem", border: "1px solid #333", borderRadius: "8px", minWidth: "120px" }}>
          Rejected: {byStatus.Rejected}
        </div>
      </div>

      {/* Add / Edit form */}
      <div style={{ marginBottom: "2rem", padding: "1rem", border: "2px solid #333", borderRadius: "8px" }}>
        <h2>{editingId ? "Edit Application" : "Add New Application"}</h2>
        <form onSubmit={addOrUpdateApplication} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Company"
            value={newApp.company}
            onChange={(e) => setNewApp({ ...newApp, company: e.target.value })}
            style={{ padding: "0.5rem", flex: 1, minWidth: "200px" }}
          />
          <input
            type="text"
            placeholder="Job Title"
            value={newApp.role}
            onChange={(e) => setNewApp({ ...newApp, role: e.target.value })}
            style={{ padding: "0.5rem", flex: 1, minWidth: "200px" }}
          />
          <select
            value={newApp.status}
            onChange={(e) => setNewApp({ ...newApp, status: e.target.vale })}
            style={{ padding: "0.5rem" }}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            type="text"
            placeholder="Notes (Remote, Peru, salary...)"
            value={newApp.notes}
            onChange={(e) => setNewApp({ ...newApp, notes: e.target.value })}
            style={{ padding: "0.5rem", flex: 2, minWidth: "250px" }}
          />
          <button type="submit" style={{ padding: "0.5rem 1rem", background: "#333", color: "white", border: "none", borderRadius: "4px" }}>
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setNewApp({ company: "", role: "", status: "Applied", notes: "" }); }} 
              style={{ padding: "0.5rem 1rem", background: "#666", color: "white", border: "none", borderRadius: "4px" }}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Filters */}
      <div style={{ marginBottom: "1rem" }}>
        <strong>Filter: </strong>
        {["All", "Applied", "Interviewing", "Offer", "Rejected"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{ marginRight: "0.5rem", padding: "0.3rem 0.8rem", background: filter === f ? "#333" : "#ddd", color: filter === f ? "white" : "black" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Application list */}
      <h2>Your Applications ({filteredApps.length})</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredApps.map(app => (
          <li key={app.id} style={{ padding: "1rem", marginBottom: "0.5rem", border: "1px solid #ccc", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <strong>{app.company}</strong> — {app.role}<br />
              <span style={{ color: "#666" }}>{app.status} • {app.date}</span><br />
              {app.notes && <span style={{ fontSize: "0.9em", color: "#444" }}>Notes: {app.notes}</span>}
            </div>
            <div>
              <button onClick={() => startEdit(app)} style={{ marginRight: "0.5rem", padding: "0.3rem 0.8rem", background: "#0066cc", color: "white", border: "none", borderRadius: "4px" }}>
                Edit
              </button>
              <button 
                onClick={() => deleteApplication(app.id)}
                style={{ padding: "0.3rem 0.8rem", background: "#c00", color: "white", border: "none", borderRadius: "4px" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
