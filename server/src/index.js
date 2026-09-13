import express from "express";
import cors from "cors";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

// Validate required environment variables (no fallbacks)
const REQUIRED_ENV = [
	"CLOUDINARY_API_KEY",
	"CLOUDINARY_API_SECRET",
	"CLOUDINARY_CLOUD_NAME",
	"EMAIL",
	"PASSWORD",
	"SUPABASE_URL",
	"SUPABASE_SECRET_KEY",
	"GOOGLE_CLIENT_ID"
];

for (const key of REQUIRED_ENV) {
	if (!process.env[key]) {
		console.error(`FATAL: Missing required environment variable: ${key}`);
		process.exit(1);
	}
}

import mailRouter from "../api/server.js";
import homeAPI from "../api/homeAPI.js";
import photoAPI from "../api/photoAPI.js";
import dataAPI from "../api/dataAPI.js";
import authAPI from "../api/authAPI.js";
import adminAPI from "../api/adminAPI.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Enable Gzip/Brotli compression for all text/json/js/css responses
app.use(compression());

// Parse JSON request bodies
app.use(express.json());

// Enable CORS with caching headers
app.use(cors());

// Static asset caching options for production builds
const staticOptions = {
	maxAge: "1y",
	immutable: true,
	etag: true,
	lastModified: true,
	setHeaders: (res, filePath) => {
		if (filePath.endsWith("index.html")) {
			// index.html must revalidate to enable seamless zero-cache-busting deployments
			res.setHeader("Cache-Control", "no-cache");
		} else if (filePath.endsWith(".pdf") || filePath.includes("/images/")) {
			// Documents and images cached for 1 day with 7 day stale-while-revalidate
			res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
		} else {
			// Hashed JS/CSS chunks cached permanently
			res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
		}
	},
};

// Serve built frontend assets if dist exists
const distPath = path.join(__dirname, "../../client/dist");
app.use(express.static(distPath, staticOptions));

// API routes
app.use("/", homeAPI);
app.use("/mail", mailRouter);
app.use("/photography", photoAPI);
app.use("/api", dataAPI);
app.use("/auth", authAPI);
app.use("/admin/api", adminAPI);

// SPA catch-all: serve index.html for any unmatched route so React Router handles it
app.get("*", (req, res) => {
	res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} with compression & max caching enabled`);
});
