import express from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (payload.email !== "turjob44@gmail.com") {
      return res.status(403).json({ error: "Unauthorized email address" });
    }

    const token = jwt.sign(
      { email: payload.email, name: payload.name, picture: payload.picture, role: "admin" },
      process.env.SUPABASE_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({ token, user: { name: payload.name, picture: payload.picture } });
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ error: "Authentication failed" });
  }
});

export default router;
