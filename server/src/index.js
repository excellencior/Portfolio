import express from "express";
import cors from "cors";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

import mailRouter from "../api/server.js";
import homeAPI from "../api/homeAPI.js";
import photoAPI from "../api/photoAPI.js";

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

// SPA catch-all: serve index.html for any unmatched route so React Router handles it
app.get("*", (req, res) => {
	res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} with compression & max caching enabled`);
});