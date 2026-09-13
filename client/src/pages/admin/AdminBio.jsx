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

const AdminBio = () => {
  const [bio, setBio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [cvUploading, setCvUploading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchBio();
  }, []);

  const fetchBio = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/api/bio`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });
      const data = await res.json();
      setBio(data[0] || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 3000);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/admin/api/bio/${bio.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify(bio)
      });
      showToast("Bio updated successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to update");
    } finally {
      setIsSaving(false);
    }
  };

  const autoGrow = (e) => {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const f = (field) => bio[field] || "";
  const set = (field, val) => setBio({...bio, [field]: val});

  if (loading) return <div className="admin-page"><h2>Edit Bio</h2><div className="spinner-container"><div className="spinner" /></div></div>;
  if (!bio) return <div className="admin-page">No bio found.</div>;

  return (
    <div className="admin-page">
      <h2>Edit Bio</h2>
      <form onSubmit={handleSave} className="admin-form">

        <div className="form-section">
          <h4 className="form-section-title">Identity</h4>
          <div className="grid-2-col">
            <label>
              <span className="label-text">Full Name<span className="required-asterisk">*</span></span>
              <input type="text" value={f("name")} onChange={e => set("name", e.target.value)} placeholder="e.g. Apurbo Banik Turjo" required />
            </label>
            <label>
              <span className="label-text">Tagline</span>
              <input type="text" value={f("tagline")} onChange={e => set("tagline", e.target.value)} placeholder="One-liner shown under your name" />
            </label>
            <label>
              <span className="label-text">Role / Position</span>
              <input type="text" value={f("role_title")} onChange={e => set("role_title", e.target.value)} placeholder="e.g. Software Engineer" />
            </label>
            <label>
              <span className="label-text">Education</span>
              <input type="text" value={f("education")} onChange={e => set("education", e.target.value)} placeholder="e.g. B.Sc. in CSE, BUET" />
            </label>
            <label>
              <span className="label-text">Organization</span>
              <input type="text" value={f("organization")} onChange={e => set("organization", e.target.value)} placeholder="e.g. Therap (BD) Ltd." />
            </label>
            <label>
              <span className="label-text">Organization URL</span>
              <input type="url" value={f("organization_url")} onChange={e => set("organization_url", e.target.value)} placeholder="https://therapbd.com" />
            </label>
          </div>
          <ImageUpload
            value={bio.profile_photo}
            onChange={(url) => set("profile_photo", url)}
            folder="profile"
          />
        </div>

        <div className="form-section">
          <h4 className="form-section-title">Contact</h4>
          <div className="grid-2-col">
            <label>
              <span className="label-text">Email</span>
              <input type="email" value={f("email")} onChange={e => set("email", e.target.value)} placeholder="you@example.com" />
            </label>
            <label>
              <span className="label-text">Phone</span>
              <input type="tel" value={f("phone")} onChange={e => set("phone", e.target.value)} placeholder="+880 1XXX XXXXXX" />
            </label>
            <label>
              <span className="label-text">Location</span>
              <input type="text" value={f("location")} onChange={e => set("location", e.target.value)} placeholder="e.g. Dhaka, Bangladesh" />
            </label>
          </div>
        </div>

        <div className="form-section">
          <h4 className="form-section-title">Social Links</h4>
          <div className="grid-2-col">
            <label>
              <span className="label-text">GitHub</span>
              <input type="url" value={f("github_url")} onChange={e => set("github_url", e.target.value)} placeholder="https://github.com/username" />
            </label>
            <label>
              <span className="label-text">LinkedIn</span>
              <input type="url" value={f("linkedin_url")} onChange={e => set("linkedin_url", e.target.value)} placeholder="https://linkedin.com/in/username" />
            </label>
            <label>
              <span className="label-text">Google Scholar</span>
              <input type="url" value={f("scholar_url")} onChange={e => set("scholar_url", e.target.value)} placeholder="https://scholar.google.com/citations?user=..." />
            </label>
            <label>
              <span className="label-text">Twitter / X</span>
              <input type="url" value={f("twitter_url")} onChange={e => set("twitter_url", e.target.value)} placeholder="https://x.com/username" />
            </label>
            <label>
              <span className="label-text">Facebook</span>
              <input type="url" value={f("facebook_url")} onChange={e => set("facebook_url", e.target.value)} placeholder="https://facebook.com/username" />
            </label>
            <label>
              <span className="label-text">Instagram</span>
              <input type="url" value={f("instagram_url")} onChange={e => set("instagram_url", e.target.value)} placeholder="https://instagram.com/username" />
            </label>
          </div>
          <div style={{marginTop: "0.75rem"}}>
            <span style={{fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: "0.4rem", color: "var(--text-color)"}}>CV / Resume</span>
            <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
              {f("cv_url") && (
                <a href={f("cv_url")} target="_blank" rel="noopener noreferrer" style={{fontSize: "0.82rem", color: "var(--primary-color)"}}>
                  View current CV
                </a>
              )}
              <input
                type="file"
                accept=".pdf"
                id="cv-upload"
                style={{display: "none"}}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setCvUploading(true);
                  try {
                    const formData = new FormData();
                    formData.append("file", file);
                    formData.append("folder", "cv");
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/api/upload`, {
                      method: "POST",
                      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
                      body: formData,
                    });
                    const result = await res.json();
                    if (result.url) {
                      set("cv_url", result.url);
                      showToast("CV uploaded");
                    } else {
                      showToast("Upload failed");
                    }
                  } catch (err) {
                    console.error(err);
                    showToast("Upload failed");
                  } finally {
                    setCvUploading(false);
                    e.target.value = "";
                  }
                }}
              />
              <button
                type="button"
                className="admin-btn-add"
                style={{margin: 0, whiteSpace: "nowrap"}}
                onClick={() => document.getElementById("cv-upload").click()}
                disabled={cvUploading}
              >
                {cvUploading ? "Uploading..." : f("cv_url") ? "Replace CV" : "Upload CV"}
              </button>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4 className="form-section-title">Quote</h4>
          <div className="grid-2-col">
            <label>
              <span className="label-text">Quote Text</span>
              <input type="text" value={f("quote")} onChange={e => set("quote", e.target.value)} placeholder="A quote that inspires you" />
            </label>
            <label>
              <span className="label-text">Quote Author</span>
              <input type="text" value={f("quote_author")} onChange={e => set("quote_author", e.target.value)} placeholder="e.g. William Shakespeare" />
            </label>
          </div>
        </div>

        <div className="form-section">
          <h4 className="form-section-title">About Me</h4>

          <label>
            <span className="label-text">Bio Description (HTML allowed)</span>
            <textarea
              value={f("description")}
              onChange={e => { set("description", e.target.value); autoGrow(e); }}
              placeholder="Write your bio here..."
              onFocus={autoGrow}
              style={{minHeight: "150px"}}
              onKeyDown={e => {
                if ((e.ctrlKey || e.metaKey) && ["b", "i", "u"].includes(e.key.toLowerCase())) {
                  e.preventDefault();
                  const tag = e.key.toLowerCase();
                  const ta = e.target;
                  const start = ta.selectionStart;
                  const end = ta.selectionEnd;
                  if (start === end) return;
                  const selected = ta.value.substring(start, end);
                  const wrapped = `<${tag}>${selected}</${tag}>`;
                  ta.focus();
                  ta.setSelectionRange(start, end);
                  document.execCommand("insertText", false, wrapped);
                }
              }}
            />
            <div style={{display: "flex", justifyContent: "space-between", marginTop: "0.15rem"}}>
              <span style={{fontSize: "0.72rem", color: "var(--text-light)"}}>Ctrl+B bold, Ctrl+I italic, Ctrl+U underline</span>
              <span className="char-count" style={{margin: 0}}>{f("description").length} chars</span>
            </div>
          </label>

          <ChipInput
            label="Research Interests"
            items={bio.research_interests || []}
            onChange={v => set("research_interests", v)}
            placeholder="Type an interest and press Enter"
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "0.5rem" }}>
          <button type="submit" className="admin-btn" disabled={isSaving}>
            {isSaving ? <span className="spinner"></span> : "Save Bio"}
          </button>
        </div>
      </form>

      {toastMessage && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default AdminBio;
