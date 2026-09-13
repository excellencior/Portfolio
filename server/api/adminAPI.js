import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { supabaseGet, supabaseUpsert, supabaseUpdate, supabaseDelete } from "../src/supabase.js";
import { cache } from "./dataAPI.js";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.SUPABASE_SECRET_KEY);
    if (decoded.role !== "admin") throw new Error("Not an admin");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Forbidden" });
  }
};

router.use(verifyToken);

const ALLOWED_TABLES = ["publications", "projects", "life_updates", "academics", "bio"];
const validateTable = (req, res, next) => {
  if (!ALLOWED_TABLES.includes(req.params.table)) {
    return res.status(400).json({ error: "Invalid table" });
  }
  next();
};

const clearCache = () => {
  Object.keys(cache).forEach(key => delete cache[key]);
};

router.get("/:table", validateTable, async (req, res) => {
  try {
    const { data, error } = await supabaseGet(req.params.table, { select: "*" });
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:table", validateTable, async (req, res) => {
  try {
    const { data, error } = await supabaseUpsert(req.params.table, req.body);
    if (error) throw error;
    clearCache();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:table/:id", validateTable, async (req, res) => {
  try {
    const { data, error } = await supabaseUpdate(req.params.table, req.params.id, req.body);
    if (error) throw error;
    clearCache();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:table/:id", validateTable, async (req, res) => {
  try {
    const { error } = await supabaseDelete(req.params.table, req.params.id);
    if (error) throw error;
    clearCache();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file provided" });

    const ext = req.file.originalname.split(".").pop();
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const folder = req.body.folder || "photos";
    const storagePath = `${folder}/${filename}`;

    const uploadRes = await fetch(
      `${process.env.SUPABASE_URL}/storage/v1/object/media/${storagePath}`,
      {
        method: "POST",
        headers: {
          apikey: process.env.SUPABASE_SECRET_KEY,
          Authorization: `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
          "Content-Type": req.file.mimetype,
        },
        body: req.file.buffer,
      }
    );

    if (!uploadRes.ok) {
      const errBody = await uploadRes.text();
      throw new Error(`Storage upload failed: ${errBody}`);
    }

    const publicUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/media/${storagePath}`;
    res.json({ url: publicUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
