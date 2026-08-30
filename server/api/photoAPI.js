import express from "express";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// In-memory cache for Cloudinary photo metadata and signed URLs
let cachedPhotos = null;
let cacheTimestamp = 0;
let cacheEtag = "";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes TTL

const generateETag = (data) => {
	const str = JSON.stringify(data);
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = ((hash << 5) - hash) + str.charCodeAt(i);
		hash |= 0;
	}
	return `"${hash.toString(36)}-${data.length}"`;
};

router.get("/photos", async (req, res) => {
	const now = Date.now();

	// Check if server in-memory cache is valid
	if (cachedPhotos && (now - cacheTimestamp < CACHE_TTL_MS)) {
		// Support HTTP conditional GET with If-None-Match (304 Not Modified)
		if (req.headers["if-none-match"] === cacheEtag) {
			return res.status(304).end();
		}

		res.setHeader("Cache-Control", "public, max-age=600, stale-while-revalidate=1200");
		res.setHeader("ETag", cacheEtag);
		return res.json(cachedPhotos);
	}

	try {
		const result = await cloudinary.api.resources({
			type: "upload",
			max_results: 100,
		});

		const signedImages = result.resources.map((img) => ({
			title: img.public_id.split("/").pop(),
			url: cloudinary.url(img.public_id, {
				sign_url: true,
				expires_at: Math.floor(Date.now() / 1000) + 60 * 30, // 30 minutes signed URL
			}),
		}));

		// Update in-memory cache
		cachedPhotos = signedImages;
		cacheTimestamp = now;
		cacheEtag = generateETag(signedImages);

		res.setHeader("Cache-Control", "public, max-age=600, stale-while-revalidate=1200");
		res.setHeader("ETag", cacheEtag);
		res.json(signedImages);
	} catch (err) {
		console.error("Cloudinary fetch error:", err);
		// If Cloudinary fails, fallback to existing cache if available
		if (cachedPhotos) {
			res.setHeader("Cache-Control", "public, max-age=300");
			return res.json(cachedPhotos);
		}
		res.status(500).json({ error: "Failed to fetch images" });
	}
});

export default router;
