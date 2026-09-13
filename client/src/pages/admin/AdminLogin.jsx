import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./admin.css";

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const AdminLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Load GSI script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    window.handleGoogleCredentialResponse = async (response) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: response.credential }),
        });

        if (!res.ok) throw new Error("Login failed");

        const data = await res.json();
        localStorage.setItem("admin_token", data.token);
        navigate("/admin/publications");
      } catch (err) {
        console.error(err);
        alert("Failed to login");
      }
    };

    return () => {
      document.body.removeChild(script);
      delete window.handleGoogleCredentialResponse;
    };
  }, [navigate]);

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>Admin Login</h2>
        <div id="g_id_onload"
           data-client_id={CLIENT_ID}
           data-context="signin"
           data-ux_mode="popup"
           data-callback="handleGoogleCredentialResponse"
           data-auto_prompt="false">
        </div>
        <div className="g_id_signin"
           data-type="standard"
           data-shape="rectangular"
           data-theme="outline"
           data-text="signin_with"
           data-size="large"
           data-logo_alignment="left">
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
