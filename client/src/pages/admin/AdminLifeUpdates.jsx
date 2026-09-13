import { useState, useEffect } from "react";
import ImageUpload from "./ImageUpload.jsx";
import "./admin.css";

const AdminLifeUpdates = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "sort_order", direction: "desc" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/api/life_updates`, {
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
      await fetch(`${import.meta.env.VITE_API_URL}/admin/api/life_updates/${itemToDelete}`, {
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
      ? `${import.meta.env.VITE_API_URL}/admin/api/life_updates/${editingItem.id}`
      : `${import.meta.env.VITE_API_URL}/admin/api/life_updates`;

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

  const autoGrow = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h2>Life Updates</h2>
        <button className="admin-btn-add" onClick={() => setEditingItem({})}>+ Add New</button>
      </div>
      {loading ? (
        <div className="spinner-container"><div className="spinner" /></div>
      ) : (<>
      <table className="admin-table admin-desktop-only">
        <thead>
          <tr>
            <th onClick={() => handleSort("date")}>Date{getSortIcon("date")}</th>
            <th onClick={() => handleSort("title")}>Title{getSortIcon("title")}</th>
            <th onClick={() => handleSort("sort_order")}>Sort Order{getSortIcon("sort_order")}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.length === 0 ? (
            <tr><td colSpan="4" className="admin-table-empty">No life updates found.</td></tr>
          ) : (
            sortedItems.map(item => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td title={item.title}>{item.title}</td>
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
          <p className="admin-table-empty">No life updates found.</p>
        ) : (
          sortedItems.map(item => (
            <div key={item.id} className="admin-card">
              <div className="admin-card-title">{item.title}</div>
              <div className="admin-card-meta">{item.date}</div>
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
            <h3>{editingItem.id ? "Edit Update" : "Add Update"}</h3>
            <form onSubmit={handleSave} className="admin-form">

              <div className="form-section">
                <h4 className="form-section-title">Update Info</h4>

                <label>
                  <span className="label-text">Title<span className="required-asterisk">*</span></span>
                  <input type="text" value={editingItem.title || ""} onChange={e => setEditingItem({...editingItem, title: e.target.value})} placeholder="e.g. Started a new job" required />
                </label>

                <div className="grid-2-col" style={{marginTop: "1rem"}}>
                  <label>
                    <span className="label-text">Date (General)<span className="required-asterisk">*</span></span>
                    <input type="text" value={editingItem.date || ""} onChange={e => setEditingItem({...editingItem, date: e.target.value})} placeholder="e.g. 2025" required />
                  </label>
                  <label>
                    Specific Date
                    <input type="text" value={editingItem.specific_date || ""} onChange={e => setEditingItem({...editingItem, specific_date: e.target.value})} placeholder="e.g. Jan 15, 2025" />
                  </label>
                </div>

                <label style={{marginTop: "1rem"}}>
                  Description
                  <textarea
                    value={editingItem.description || ""}
                    onChange={e => { setEditingItem({...editingItem, description: e.target.value}); autoGrow(e); }}
                    placeholder="Provide context or details about the update..."
                    onFocus={autoGrow}
                  />
                  <div className="char-count">{(editingItem.description || "").length} chars</div>
                </label>
              </div>

              <div className="form-section">
                <h4 className="form-section-title">Media & Metadata</h4>
                <div className="grid-2-col">
                  <ImageUpload
                    value={editingItem.image_url}
                    onChange={(url) => setEditingItem({...editingItem, image_url: url})}
                    folder="updates"
                  />
                  <label>
                    Sort Order
                    <input type="number" value={editingItem.sort_order || 0} onChange={e => setEditingItem({...editingItem, sort_order: parseInt(e.target.value) || 0})} />
                  </label>
                </div>
              </div>

              <div style={{display: "flex", gap: "10px", marginTop: "0.5rem", justifyContent: "flex-end"}}>
                <button type="button" className="admin-btn-cancel" onClick={() => setEditingItem(null)}>Cancel</button>
                <button type="submit" className="admin-btn" disabled={isSaving}>
                  {isSaving ? <span className="spinner"></span> : "Save Update"}
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
            <p>Are you sure you want to delete this update? This action cannot be undone.</p>
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

export default AdminLifeUpdates;
