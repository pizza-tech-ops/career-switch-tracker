import { useState } from 'react';

function App() {
  const [applications, setApplications] = useState([
    { id: 1, company: "Example Corp", role: "Junior Web Dev", status: "Applied", date: "2026-04-05" }
  ]);
  const [newApp, setNewApp] = useState({ company: "", role: "", status: "Applied" });

  const addApplication = (e) => {
    e.preventDefault();
    if (!newApp.company || !newApp.role) return;
    setApplications([
      ...applications,
      { id: Date.now(), ...newApp, date: new Date().toISOString().split('T')[0] }
    ]);
    setNewApp({ company: "", role: "", status: "Applied" });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Career Switch Tracker</h1>
      <p style={{ color: "#666" }}>Built by me — midnight sessions only</p>

      <div style={{ marginBottom: "2rem", padding: "1rem", border: "2px solid #333", borderRadius: "8px" }}>
        <h2>Add New Application</h2>
        <form onSubmit={addApplication} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
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
            onChange={(e) => setNewApp({ ...newApp, status: e.target.value })}
            style={{ padding: "0.5rem" }}
          >
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button type="submit" style={{ padding: "0.5rem 1rem", background: "#333", color: "white", border: "none", borderRadius: "4px" }}>
            Add
          </button>
        </form>
      </div>

      <h2>Your Applications ({applications.length})</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {applications.map(app => (
          <li key={app.id} style={{ padding: "1rem", marginBottom: "0.5rem", border: "1px solid #ccc", borderRadius: "6px" }}>
            <strong>{app.company}</strong> — {app.role}<br />
            <span style={{ color: "#666" }}>{app.status} • {app.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
