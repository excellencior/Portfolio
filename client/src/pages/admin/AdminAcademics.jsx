import { useState, useEffect } from "react";
import "./admin.css";

const ChipInput = ({ label, items = [], onChange, placeholder }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = inputValue.trim();
      if (val && !items.includes(val)) {
        onChange([...items, val]);
        setInputValue("");
      }
    }
  };

  const removeChip = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <label>
      {label}
      <div className="chip-input-container">
        {items.map((item, index) => (
          <span key={index} className="chip">
            {item}
            <button type="button" className="chip-remove" onClick={() => removeChip(index)}>&times;</button>
          </span>
        ))}
        <input
          type="text"
          className="chip-input-field"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={items.length === 0 ? placeholder : ""}
        />
      </div>
    </label>
  );
};

const AdminAcademics = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "year", direction: "desc" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/api/academics`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/admin/api/academics/${itemToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      fetchItems();
      setItemToDelete(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const method = editingItem.id ? "PUT" : "POST";
    const url = editingItem.id
      ? `${import.meta.env.VITE_API_URL}/admin/api/academics/${editingItem.id}`
      : `${import.meta.env.VITE_API_URL}/admin/api/academics`;

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify(editingItem)
      });
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setEditingItem(null);
        setItemToDelete(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target.className === "modal-overlay") {
      setEditingItem(null);
      setItemToDelete(null);
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = [...items].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return " ↕";
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Academics</h2>
        <button className="admin-btn-add" onClick={() => setEditingItem({ coursework: [] })}>+ Add New</button>
      </div>
      {loading ? (
        <div className="spinner-container"><div className="spinner" /></div>
      ) : (<>
      <table className="admin-table admin-desktop-only">
        <thead>
          <tr>
            <th onClick={() => handleSort("year")}>Year{getSortIcon("year")}</th>
            <th onClick={() => handleSort("level")}>Level{getSortIcon("level")}</th>
            <th onClick={() => handleSort("institution")}>Institution{getSortIcon("institution")}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.length === 0 ? (
            <tr><td colSpan="4" className="admin-table-empty">No academic entries found.</td></tr>
          ) : (
            sortedItems.map(item => (
              <tr key={item.id}>
                <td>{item.year}</td>
                <td>{item.level}</td>
                <td title={item.institution}>{item.institution}</td>
                <td className="admin-actions">
                  <button className="admin-btn-edit" onClick={() => setEditingItem(item)}>Edit</button>
                  <button className="admin-btn-delete" onClick={() => setItemToDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="admin-cards admin-mobile-only">
        {sortedItems.length === 0 ? (
          <p className="admin-table-empty">No academic entries found.</p>
        ) : (
          sortedItems.map(item => (
            <div key={item.id} className="admin-card">
              <div className="admin-card-title">{item.level}</div>
              <div className="admin-card-meta">{item.institution} &middot; {item.year}</div>
              <div className="admin-card-actions">
                <button className="admin-btn-edit" onClick={() => setEditingItem(item)}>Edit</button>
                <button className="admin-btn-delete" onClick={() => setItemToDelete(item.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      </>)}

      {editingItem && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <h3>{editingItem.id ? "Edit Academic Entry" : "Add Academic Entry"}</h3>
            <form onSubmit={handleSave} className="admin-form">

              <div className="form-section">
                <h4 className="form-section-title">Institution & Degree</h4>
                <div className="grid-2-col">
                  <label>
                    <span className="label-text">Institution<span className="required-asterisk">*</span></span>
                    <input type="text" value={editingItem.institution || ""} onChange={e => setEditingItem({...editingItem, institution: e.target.value})} placeholder="e.g. Stanford University" required />
                  </label>
                  <label>
                    Degree
                    <input type="text" value={editingItem.degree || ""} onChange={e => setEditingItem({...editingItem, degree: e.target.value})} placeholder="e.g. B.S. in Computer Science" />
                  </label>
                  <label>
                    <span className="label-text">Year<span className="required-asterisk">*</span></span>
                    <input type="text" value={editingItem.year || ""} onChange={e => setEditingItem({...editingItem, year: e.target.value})} placeholder="e.g. 2021 - 2025" required />
                  </label>
                  <label>
                    <span className="label-text">Level<span className="required-asterisk">*</span></span>
                    <input type="text" value={editingItem.level || ""} onChange={e => setEditingItem({...editingItem, level: e.target.value})} placeholder="e.g. Undergraduate" required />
                  </label>
                  <label>
                    Class
                    <input type="text" value={editingItem.class || ""} onChange={e => setEditingItem({...editingItem, class: e.target.value})} placeholder="e.g. Class of 2025" />
                  </label>
                  <label>
                    Rank / GPA
                    <input type="text" value={editingItem.rank || ""} onChange={e => setEditingItem({...editingItem, rank: e.target.value})} placeholder="e.g. 3.9/4.0" />
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h4 className="form-section-title">Thesis & Details</h4>
                <div className="grid-2-col">
                  <label style={{gridColumn: "1 / -1"}}>
                    Thesis Title
                    <input type="text" value={editingItem.thesis || ""} onChange={e => setEditingItem({...editingItem, thesis: e.target.value})} placeholder="e.g. Deep Learning in Healthcare" />
                  </label>
                  <label>
                    Advisor
                    <input type="text" value={editingItem.advisor || ""} onChange={e => setEditingItem({...editingItem, advisor: e.target.value})} placeholder="e.g. Prof. John Doe" />
                  </label>
                  <label>
                    Thesis Partner
                    <input type="text" value={editingItem.thesis_partner || ""} onChange={e => setEditingItem({...editingItem, thesis_partner: e.target.value})} placeholder="e.g. Jane Smith" />
                  </label>
                </div>

                <div style={{marginTop: "1.25rem"}}>
                  <ChipInput
                    label="Coursework"
                    items={editingItem.coursework || []}
                    onChange={v => setEditingItem({...editingItem, coursework: v})}
                    placeholder="Type a course and press Enter"
                  />
                </div>
              </div>

              <div className="form-section">
                <h4 className="form-section-title">Location & Meta</h4>
                <div className="grid-2-col">
                  <label>
                    Location Name
                    <input type="text" value={editingItem.location_place || ""} onChange={e => setEditingItem({...editingItem, location_place: e.target.value})} placeholder="e.g. Stanford, CA" />
                  </label>
                  <label>
                    Location Maps Link
                    <input type="text" value={editingItem.location_link || ""} onChange={e => setEditingItem({...editingItem, location_link: e.target.value})} placeholder="https://maps.google.com/..." />
                  </label>
                  <label>
                    Sort Order
                    <input type="number" value={editingItem.sort_order || 0} onChange={e => setEditingItem({...editingItem, sort_order: parseInt(e.target.value) || 0})} />
                  </label>
                </div>
              </div>

              <div style={{display: "flex", gap: "10px", marginTop: "0.5rem", justifyContent: "flex-end"}}>
                <button type="button" className="admin-btn-cancel" onClick={() => setEditingItem(null)}>Cancel</button>
                <button type="submit" className="admin-btn" disabled={isSaving}>
                  {isSaving ? <span className="spinner"></span> : "Save Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {itemToDelete && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content confirm-modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this academic entry? This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="admin-btn-cancel" onClick={() => setItemToDelete(null)}>Cancel</button>
              <button className="admin-btn" style={{background: "#e74c3c"}} onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAcademics;
