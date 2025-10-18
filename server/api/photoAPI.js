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

router.get("/photos", async (req, res) => {
	console.log({
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.CLOUDINARY_API_KEY,
		api_secret: process.env.CLOUDINARY_API_SECRET,
	});

	try {
		const result = await cloudinary.api.resources({
			type: "upload",
			// prefix: "photography/", // won't work :: free plan doesn't support fixed folders :: default => dynamic
			max_results: 100,
		});

		const signedImages = result.resources.map((img) => ({
			title: img.public_id.split("/").pop(),
			url: cloudinary.url(img.public_id, {
				sign_url: true,
				expires_at: Math.floor(Date.now() / 1000) + 60 * 5,
			}),
		}));

		res.json(signedImages);
		
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch images" });
	}
});

export default router;
