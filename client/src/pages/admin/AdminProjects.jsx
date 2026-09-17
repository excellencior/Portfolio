import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload.jsx";
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

const AdminProjects = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "sort_order", direction: "asc" });
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/api/projects`, {
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
      await fetch(`${import.meta.env.VITE_API_URL}/admin/api/projects/${itemToDelete}`, {
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
    setSaveError("");
    const method = editingItem.id ? "PUT" : "POST";
    const url = editingItem.id
      ? `${import.meta.env.VITE_API_URL}/admin/api/projects/${editingItem.id}`
      : `${import.meta.env.VITE_API_URL}/admin/api/projects`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify(editingItem)
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Unable to save project (${res.status})`);
      }

      setEditingItem(null);
      await fetchItems();
    } catch (err) {
      console.error(err);
      setSaveError(err.message);
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

  const autoGrow = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Projects</h2>
        <button className="admin-btn-add" onClick={() => { setSaveError(""); setEditingItem({ tags: [], category: "AI & Machine Learning" }); }}>+ Add New</button>
      </div>
      {loading ? (
        <div className="spinner-container"><div className="spinner" /></div>
      ) : (<>
      <table className="admin-table admin-desktop-only">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title{getSortIcon("title")}</th>
            <th onClick={() => handleSort("category")}>Category{getSortIcon("category")}</th>
            <th onClick={() => handleSort("sort_order")}>Sort Order{getSortIcon("sort_order")}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.length === 0 ? (
            <tr><td colSpan="4" className="admin-table-empty">No projects found.</td></tr>
          ) : (
            sortedItems.map(item => (
              <tr key={item.id}>
                <td title={item.title}>{item.title}</td>
                <td title={item.category}>{item.category}</td>
                <td>{item.sort_order}</td>
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
          <p className="admin-table-empty">No projects found.</p>
        ) : (
          sortedItems.map(item => (
            <div key={item.id} className="admin-card">
              <div className="admin-card-title">{item.title}</div>
              <div className="admin-card-meta">{item.category}</div>
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
            <h3>{editingItem.id ? "Edit Project" : "Add Project"}</h3>
            <form onSubmit={handleSave} className="admin-form">

              {saveError && <div className="error-message" role="alert">{saveError}</div>}

              <div className="form-section">
                <h4 className="form-section-title">Basic Info</h4>
                <div className="grid-2-col">
                  <label style={{gridColumn: "1 / -1"}}>
                    <span className="label-text">Title<span className="required-asterisk">*</span></span>
                    <input type="text" value={editingItem.title || ""} onChange={e => setEditingItem({...editingItem, title: e.target.value})} placeholder="e.g. My Awesome Project" required />
                  </label>
                  <label>
                    Subtitle
                    <input type="text" value={editingItem.subtitle || ""} onChange={e => setEditingItem({...editingItem, subtitle: e.target.value})} placeholder="e.g. A short catchy phrase" />
                  </label>
                  <label>
                    <span className="label-text">Category<span className="required-asterisk">*</span></span>
                    <select value={editingItem.category || ""} onChange={e => setEditingItem({...editingItem, category: e.target.value})} required>
                      <option value="">Select a category</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Systems & Full Stack">Systems & Full Stack</option>
                      <option value="Foundations">Foundations</option>
                    </select>
                  </label>
                  <label>
                    Date
                    <input type="text" value={editingItem.date || ""} onChange={e => setEditingItem({...editingItem, date: e.target.value})} placeholder="e.g. January 2025" />
                  </label>
                </div>

                <label style={{marginTop: "1rem"}}>
                  Description
                  <textarea
                    value={editingItem.description || ""}
                    onChange={e => { setEditingItem({...editingItem, description: e.target.value}); autoGrow(e); }}
                    placeholder="Detailed description of the project..."
                    onFocus={autoGrow}
                  />
                  <div className="char-count">{(editingItem.description || "").length} chars</div>
                </label>
              </div>

              <div className="form-section">
                <h4 className="form-section-title">Links & Metadata</h4>
                <div className="grid-2-col">
                  <ImageUpload
                    value={editingItem.image_url}
                    onChange={(url) => setEditingItem({...editingItem, image_url: url})}
                    folder="projects"
                  />
                  <label>
                    Repo Link
                    <input type="text" value={editingItem.repo_link || ""} onChange={e => setEditingItem({...editingItem, repo_link: e.target.value})} placeholder="https://github.com/..." />
                  </label>
                  <label>
                    Deployed At
                    <input type="text" value={editingItem.deployed_at || ""} onChange={e => setEditingItem({...editingItem, deployed_at: e.target.value})} placeholder="https://myapp.com" />
                  </label>
                  <label>
                    Sort Order
                    <input type="number" value={editingItem.sort_order || 0} onChange={e => setEditingItem({...editingItem, sort_order: parseInt(e.target.value) || 0})} />
                  </label>
                </div>

                <div style={{marginTop: "1rem"}}>
                  <ChipInput
                    label="Tags"
                    items={editingItem.tags || []}
                    onChange={v => setEditingItem({...editingItem, tags: v})}
                    placeholder="Type a tag and press Enter"
                  />
                </div>
              </div>

              <div style={{display: "flex", gap: "10px", marginTop: "0.5rem", justifyContent: "flex-end"}}>
                <button type="button" className="admin-btn-cancel" onClick={() => setEditingItem(null)}>Cancel</button>
                <button type="submit" className="admin-btn" disabled={isSaving}>
                  {isSaving ? <span className="spinner"></span> : "Save Project"}
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
            <p>Are you sure you want to delete this project? This action cannot be undone.</p>
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

export default AdminProjects;
