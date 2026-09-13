import { useState, useId } from "react";

const ImageUpload = ({ value, onChange, folder = "photos" }) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputId = useId();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/api/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
        body: formData,
      });
      const result = await res.json();
      if (result.url) {
        onChange(result.url);
      }
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <span style={{fontWeight: 600, fontSize: "0.85rem", display: "block", marginBottom: "0.4rem", color: "var(--text-color)"}}>Image</span>
      <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
        {value && (
          <img src={value} alt="Preview" className="photo-preview" />
        )}
        <input
          type="file"
          accept="image/*"
          id={inputId}
          style={{display: "none"}}
          onChange={handleUpload}
        />
        <button
          type="button"
          className="admin-btn-add"
          style={{margin: 0, whiteSpace: "nowrap"}}
          onClick={() => document.getElementById(inputId).click()}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : value ? "Change" : "Upload"}
        </button>
        {value && (
          <button
            type="button"
            className="admin-btn-cancel"
            style={{margin: 0, whiteSpace: "nowrap"}}
            onClick={() => onChange("")}
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
