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

const AdminPublications = () => {
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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/api/publications`, {
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
      await fetch(`${import.meta.env.VITE_API_URL}/admin/api/publications/${itemToDelete}`, {
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
    let parsedAuthors = editingItem.authors;
    if (typeof parsedAuthors === "string") {
      try {
        parsedAuthors = JSON.parse(parsedAuthors);
      } catch {
        parsedAuthors = [];
      }
    }

    const payload = { ...editingItem, authors: parsedAuthors };

    const url = editingItem.id
      ? `${import.meta.env.VITE_API_URL}/admin/api/publications/${editingItem.id}`
      : `${import.meta.env.VITE_API_URL}/admin/api/publications`;

    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify(payload)
      });
      setEditingItem(null);
      fetchItems();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAuthorChange = (index, field, value) => {
    const newAuthors = [...(editingItem.authors || [])];
    newAuthors[index] = { ...newAuthors[index], [field]: value };
    setEditingItem({...editingItem, authors: newAuthors});
  };

  const addAuthor = () => {
    setEditingItem({...editingItem, authors: [...(editingItem.authors || []), { name: "", isSelf: false }]});
  };

  const removeAuthor = (index) => {
    const newAuthors = [...(editingItem.authors || [])];
    newAuthors.splice(index, 1);
    setEditingItem({...editingItem, authors: newAuthors});
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
        <h2>Publications</h2>
        <button className="admin-btn-add" onClick={() => setEditingItem({ authors: [], highlights: [], tags: [], status_class: "completed", category: "AI & Machine Learning" })}>+ Add New</button>
      </div>
      {loading ? (
        <div className="spinner-container"><div className="spinner" /></div>
      ) : (<>
      <table className="admin-table admin-desktop-only">
        <thead>
          <tr>
            <th onClick={() => handleSort("title")}>Title{getSortIcon("title")}</th>
            <th onClick={() => handleSort("venue")}>Venue{getSortIcon("venue")}</th>
            <th onClick={() => handleSort("year")}>Year{getSortIcon("year")}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedItems.length === 0 ? (
            <tr><td colSpan="4" className="admin-table-empty">No publications found.</td></tr>
          ) : (
            sortedItems.map(item => (
              <tr key={item.id}>
                <td title={item.title}>{item.title}</td>
                <td title={item.venue}>{item.venue}</td>
                <td>{item.year}</td>
                <td className="admin-actions">
                  <button className="admin-btn-edit" onClick={() => setEditingItem({...item, authors: typeof item.authors === "string" ? JSON.parse(item.authors) : item.authors })}>Edit</button>
                  <button className="admin-btn-delete" onClick={() => setItemToDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="admin-cards admin-mobile-only">
        {sortedItems.length === 0 ? (
          <p className="admin-table-empty">No publications found.</p>
        ) : (
          sortedItems.map(item => (
            <div key={item.id} className="admin-card">
              <div className="admin-card-title">{item.title}</div>
              <div className="admin-card-meta">{item.venue} &middot; {item.year}</div>
              <div className="admin-card-actions">
                <button className="admin-btn-edit" onClick={() => setEditingItem({...item, authors: typeof item.authors === "string" ? JSON.parse(item.authors) : item.authors })}>Edit</button>
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
            <h3>{editingItem.id ? "Edit Publication" : "Add Publication"}</h3>
            <form onSubmit={handleSave} className="admin-form">

              <div className="form-section">
                <h4 className="form-section-title">Basic Info</h4>
                <div className="grid-2-col">
                  <label style={{gridColumn: "1 / -1"}}>
                    <span className="label-text">Title<span className="required-asterisk">*</span></span>
                    <input type="text" value={editingItem.title || ""} onChange={e => setEditingItem({...editingItem, title: e.target.value})} placeholder="e.g. Attention Is All You Need" required />
                  </label>
                </div>

                <label style={{marginTop: "1rem", display: "block"}}>Authors</label>
                {(editingItem.authors || []).map((author, idx) => (
                  <div key={idx} className="author-item">
                    <input type="text" className="author-name-input" value={author.name} onChange={e => handleAuthorChange(idx, "name", e.target.value)} placeholder="e.g. Ashish Vaswani" />
                    <label className="switch-label">
                      Is Self
                      <div className="switch">
                        <input type="checkbox" checked={author.isSelf} onChange={e => handleAuthorChange(idx, "isSelf", e.target.checked)} />
                        <span className="slider"></span>
                      </div>
                    </label>
                    <button type="button" className="author-item-remove" onClick={() => removeAuthor(idx)} title="Remove Author">&times;</button>
                  </div>
                ))}
                <button type="button" className="array-add-btn" onClick={addAuthor}>+ Add Author</button>

                <label style={{marginTop: "1rem"}}>
                  Abstract
                  <textarea
                    value={editingItem.abstract || ""}
                    onChange={e => { setEditingItem({...editingItem, abstract: e.target.value}); autoGrow(e); }}
                    placeholder="Brief description of the publication..."
                    onFocus={autoGrow}
                  />
                  <div className="char-count">{(editingItem.abstract || "").length} chars</div>
                </label>
              </div>

              <div className="form-section">
                <h4 className="form-section-title">Publication Details</h4>
                <div className="grid-2-col">
                  <label>
                    Venue
                    <input type="text" value={editingItem.venue || ""} onChange={e => setEditingItem({...editingItem, venue: e.target.value})} placeholder="e.g. NeurIPS" />
                  </label>
                  <label>
                    Venue Details
                    <input type="text" value={editingItem.venue_details || ""} onChange={e => setEditingItem({...editingItem, venue_details: e.target.value})} placeholder="e.g. Oral Presentation" />
                  </label>
                  <label>
                    Year
                    <input type="text" value={editingItem.year || ""} onChange={e => setEditingItem({...editingItem, year: e.target.value})} placeholder="e.g. 2023" />
                  </label>
                  <label>
                    Category
                    <select value={editingItem.category || ""} onChange={e => setEditingItem({...editingItem, category: e.target.value})}>
                      <option value="">Select a category</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Systems & Full Stack">Systems & Full Stack</option>
                      <option value="Foundations">Foundations</option>
                    </select>
                  </label>
                  <label>
                    Status
                    <input type="text" value={editingItem.status || ""} onChange={e => setEditingItem({...editingItem, status: e.target.value})} placeholder="e.g. Published" />
                  </label>
                  <label>
                    Status Class
                    <select value={editingItem.status_class || ""} onChange={e => setEditingItem({...editingItem, status_class: e.target.value})}>
                      <option value="completed">Completed</option>
                      <option value="under-review">Under Review</option>
                      <option value="in-progress">In Progress</option>
                    </select>
                  </label>
                </div>
              </div>

              <div className="form-section">
                <h4 className="form-section-title">Metadata & Links</h4>
                <div className="grid-2-col">
                  <label>
                    Project Link
                    <input type="text" value={editingItem.link_project || ""} onChange={e => setEditingItem({...editingItem, link_project: e.target.value})} placeholder="https://..." />
                  </label>
                  <label>
                    Code Link
                    <input type="text" value={editingItem.link_code || ""} onChange={e => setEditingItem({...editingItem, link_code: e.target.value})} placeholder="https://github.com/..." />
                  </label>
                  <label>
                    Paper Link
                    <input type="text" value={editingItem.link_paper || ""} onChange={e => setEditingItem({...editingItem, link_paper: e.target.value})} placeholder="https://arxiv.org/..." />
                  </label>
                  <ImageUpload
                    value={editingItem.image_url}
                    onChange={(url) => setEditingItem({...editingItem, image_url: url})}
                    folder="publications"
                  />
                  <label>
                    Sort Order
                    <input type="number" value={editingItem.sort_order || 0} onChange={e => setEditingItem({...editingItem, sort_order: parseInt(e.target.value) || 0})} />
                  </label>
                  <label className="switch-label" style={{marginTop: "1.5rem"}}>
                    Selected (Featured)
                    <div className="switch">
                      <input type="checkbox" checked={editingItem.selected || false} onChange={e => setEditingItem({...editingItem, selected: e.target.checked})} />
                      <span className="slider"></span>
                    </div>
                  </label>
                </div>

                <div style={{marginTop: "1rem", display: "flex", flexDirection: "column", gap: "1rem"}}>
                  <ChipInput
                    label="Highlights"
                    items={editingItem.highlights || []}
                    onChange={v => setEditingItem({...editingItem, highlights: v})}
                    placeholder="Type a highlight and press Enter"
                  />
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
                  {isSaving ? <span className="spinner"></span> : "Save Publication"}
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
            <p>Are you sure you want to delete this publication? This action cannot be undone.</p>
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

export default AdminPublications;
