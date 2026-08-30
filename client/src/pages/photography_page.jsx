import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Skeleton } from "@mui/material";
import PhotoLightbox from "../components/PhotoLightbox";

const formatPhotoTitle = (rawTitle) => {
	if (!rawTitle) return "Photograph";
	return rawTitle
		.replace(/_/g, " ")
		.replace(/-/g, " ")
		.replace(/\.[^/.]+$/, "")
		.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Client-side in-memory cache
let photoCache = null;
let cacheTime = 0;
const CLIENT_CACHE_TTL = 10 * 60 * 1000; // 10 minutes

const getCachedPhotos = () => {
	if (photoCache && Date.now() - cacheTime < CLIENT_CACHE_TTL) {
		return photoCache;
	}
	try {
		const stored = sessionStorage.getItem("portfolio_photos_cache");
		const storedTime = sessionStorage.getItem("portfolio_photos_time");
		if (stored && storedTime && Date.now() - parseInt(storedTime, 10) < CLIENT_CACHE_TTL) {
			photoCache = JSON.parse(stored);
			cacheTime = parseInt(storedTime, 10);
			return photoCache;
		}
	} catch {
		// SessionStorage unavailable fallback
	}
	return null;
};

const setCachedPhotos = (photos) => {
	photoCache = photos;
	cacheTime = Date.now();
	try {
		sessionStorage.setItem("portfolio_photos_cache", JSON.stringify(photos));
		sessionStorage.setItem("portfolio_photos_time", cacheTime.toString());
	} catch {
		// Storage quota or private mode fallback
	}
};

const Photography = () => {
	const [images, setImages] = useState(() => getCachedPhotos() || []);
	const [loading, setLoading] = useState(() => !getCachedPhotos()?.length);
	const [selectedIndex, setSelectedIndex] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchImages = async (isBackground = false) => {
			try {
				if (!isBackground) setLoading(true);
				const res = await axios.get("/photography/photos");
				if (res.data && res.data.length > 0 && isMounted) {
					setImages(res.data);
					setCachedPhotos(res.data);
				}
			} catch (error) {
				console.error("Error fetching photos:", error);
			} finally {
				if (!isBackground && isMounted) setLoading(false);
			}
		};

		const cachedData = getCachedPhotos();
		if (!cachedData || cachedData.length === 0) {
			fetchImages(false);
		} else if (Date.now() - cacheTime > 5 * 60 * 1000) {
			fetchImages(true);
		}

		// Refresh signed URLs every 10 minutes
		const interval = setInterval(() => fetchImages(true), 10 * 60 * 1000);
		return () => {
			isMounted = false;
			clearInterval(interval);
		};
	}, []);

	const handleOpen = (idx) => {
		setSelectedIndex(idx);
	};

	const handleClose = () => {
		setSelectedIndex(null);
	};

	const handleSelectIndex = (idx) => {
		setSelectedIndex(idx);
	};

	return (
		<div>
			<h2>Photography</h2>
			<p>
				Moments captured through the lens: focusing on natural light, architectural geometry, and street scenes:
			</p>

			{loading && images.length === 0 ? (
				<div className="photo-gallery-grid">
					{[1, 2, 3, 4, 5, 6].map((n) => (
						<Box key={n} sx={{ borderRadius: 1, overflow: "hidden", border: "1px solid var(--border-color)", bgcolor: "#fff" }}>
							<Skeleton variant="rectangular" height={195} animation="wave" />
							<Box sx={{ p: 1.25 }}>
								<Skeleton variant="text" width="70%" height={20} />
							</Box>
						</Box>
					))}
				</div>
			) : images.length > 0 ? (
				<div className="photo-gallery-grid">
					{images.map((image, idx) => {
						const title = formatPhotoTitle(image.title);
						return (
							<div
								key={idx}
								className="photo-card-item"
								onClick={() => handleOpen(idx)}
								role="button"
								tabIndex={0}
								onKeyDown={(e) => e.key === "Enter" && handleOpen(idx)}
								aria-label={`View photograph: ${title}`}
							>
								<div className="photo-img-wrapper">
									<img src={image.url} alt={title} loading="lazy" />
								</div>
								<div className="photo-info">
									<p className="photo-title">{title}</p>
								</div>
							</div>
						);
					})}
				</div>
			) : (
				<p style={{ color: "#777", marginTop: "1.5rem" }}>
					No photos currently available. Please check back soon!
				</p>
			)}

			{/* Immersive Photo Lightbox */}
			<PhotoLightbox
				open={selectedIndex !== null}
				images={images}
				selectedIndex={selectedIndex}
				onClose={handleClose}
				onSelectIndex={handleSelectIndex}
			/>
		</div>
	);
};

export default Photography;
