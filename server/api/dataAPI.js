import express from "express";
import { supabaseGet, supabaseGetSingle } from "../src/supabase.js";

const router = express.Router();

export const cache = {};
const CACHE_TTL_MS = 10 * 60 * 1000;

const generateETag = (data) => {
	const str = JSON.stringify(data);
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = ((hash << 5) - hash) + str.charCodeAt(i);
		hash |= 0;
	}
	return `"${hash.toString(36)}-${Array.isArray(data) ? data.length : 1}"`;
};

const cachedQuery = async (key, queryFn, req, res) => {
	const now = Date.now();
	const entry = cache[key];

	if (entry && (now - entry.timestamp < CACHE_TTL_MS)) {
		if (req.headers["if-none-match"] === entry.etag) {
			return res.status(304).end();
		}
		res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=600");
		res.setHeader("ETag", entry.etag);
		return res.json(entry.data);
	}

	try {
		const data = await queryFn();
		const etag = generateETag(data);

		cache[key] = { data, etag, timestamp: now };

		res.setHeader("Cache-Control", "public, max-age=300, stale-while-revalidate=600");
		res.setHeader("ETag", etag);
		res.json(data);
	} catch (err) {
		console.error(`Error fetching ${key}:`, err);
		if (entry) {
			res.setHeader("Cache-Control", "public, max-age=60");
			return res.json(entry.data);
		}
		res.status(500).json({ error: `Failed to fetch ${key}` });
	}
};

router.get("/publications", (req, res) => {
	cachedQuery("publications", async () => {
		const { data, error } = await supabaseGet("publications", { select: "*", order: "sort_order.asc" });
		if (error) throw error;
		return data;
	}, req, res);
});

router.get("/projects", (req, res) => {
	cachedQuery("projects", async () => {
		const { data, error } = await supabaseGet("projects", { select: "*", order: "sort_order.asc" });
		if (error) throw error;
		return data;
	}, req, res);
});

router.get("/life-updates", (req, res) => {
	cachedQuery("life-updates", async () => {
		const { data, error } = await supabaseGet("life_updates", { select: "*", order: "sort_order.asc" });
		if (error) throw error;
		return data;
	}, req, res);
});

router.get("/academics", (req, res) => {
	cachedQuery("academics", async () => {
		const { data, error } = await supabaseGet("academics", { select: "*", order: "sort_order.asc" });
		if (error) throw error;
		return data;
	}, req, res);
});

router.get("/bio", (req, res) => {
	cachedQuery("bio", async () => {
		const { data, error } = await supabaseGetSingle("bio", 1);
		if (error) throw error;
		return data;
	}, req, res);
});

export default router;
