import { useState, useEffect, useCallback, useRef } from "react";
import {
	Dialog,
	IconButton,
	Typography,
	Box,
	Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const formatPhotoTitle = (rawTitle) => {
	if (!rawTitle) return "Photograph";
	return rawTitle
		.replace(/_/g, " ")
		.replace(/-/g, " ")
		.replace(/\.[^/.]+$/, "")
		.replace(/\b\w/g, (char) => char.toUpperCase());
};

const PhotoLightbox = ({ open, images, selectedIndex, onClose, onSelectIndex }) => {
	const [zoomLevel, setZoomLevel] = useState(1);
	const [touchStartX, setTouchStartX] = useState(null);
	const thumbnailStripRef = useRef(null);

	const total = images?.length || 0;
	const currentImage = (images && selectedIndex !== null) ? images[selectedIndex] : null;
	const currentTitle = currentImage ? formatPhotoTitle(currentImage.title) : "";

	// Reset zoom on photo change
	useEffect(() => {
		setZoomLevel(1);
	}, [selectedIndex]);

	// Preload adjacent images
	useEffect(() => {
		if (selectedIndex === null || !images || images.length === 0) return;
		const nextIdx = (selectedIndex + 1) % images.length;
		const prevIdx = (selectedIndex - 1 + images.length) % images.length;

		if (images[nextIdx]?.url) {
			const imgNext = new Image();
			imgNext.src = images[nextIdx].url;
		}
		if (images[prevIdx]?.url) {
			const imgPrev = new Image();
			imgPrev.src = images[prevIdx].url;
		}
	}, [selectedIndex, images]);

	// Auto-scroll active thumbnail into view
	useEffect(() => {
		if (thumbnailStripRef.current && selectedIndex !== null) {
			const activeThumb = thumbnailStripRef.current.children[selectedIndex];
			if (activeThumb) {
				activeThumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
			}
		}
	}, [selectedIndex]);

	const handlePrev = useCallback(() => {
		if (selectedIndex === null || total === 0) return;
		onSelectIndex((selectedIndex - 1 + total) % total);
	}, [selectedIndex, total, onSelectIndex]);

	const handleNext = useCallback(() => {
		if (selectedIndex === null || total === 0) return;
		onSelectIndex((selectedIndex + 1) % total);
	}, [selectedIndex, total, onSelectIndex]);

	const handleZoomIn = () => {
		setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
	};

	const handleZoomOut = () => {
		setZoomLevel((prev) => Math.max(prev - 0.35, 0.7));
	};

	const handleResetZoom = () => {
		setZoomLevel(1);
	};

	// Keyboard Controls
	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (e) => {
			if (e.key === "ArrowLeft") handlePrev();
			if (e.key === "ArrowRight") handleNext();
			if (e.key === "Escape") onClose();
			if (e.key === "+" || e.key === "=") handleZoomIn();
			if (e.key === "-") handleZoomOut();
			if (e.key === "0") handleResetZoom();
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open, handlePrev, handleNext, onClose]);

	// Touch Gestures for Mobile
	const handleTouchStart = (e) => {
		setTouchStartX(e.touches[0].clientX);
	};

	const handleTouchEnd = (e) => {
		if (touchStartX === null) return;
		const touchEndX = e.changedTouches[0].clientX;
		const diff = touchStartX - touchEndX;

		// Minimum swipe threshold: 50px
		if (diff > 50) {
			handleNext();
		} else if (diff < -50) {
			handlePrev();
		}
		setTouchStartX(null);
	};

	if (!currentImage) return null;

	return (
		<Dialog
			open={open}
			onClose={onClose}
			fullScreen
			PaperProps={{
				sx: {
					backgroundColor: "rgba(12, 14, 18, 0.96)",
					backdropFilter: "blur(16px)",
					color: "#ffffff",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					overflow: "hidden",
				},
			}}
		>
			{/* Top Control Bar */}
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: 0.6,
					px: { xs: 1.5, sm: 3 },
					py: 1.5,
					background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)",
					zIndex: 10,
				}}
			>
				{/* Top Row: Counter (Left) & Action Buttons (Right) */}
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
					<Typography
						variant="body2"
						sx={{
							backgroundColor: "rgba(255, 255, 255, 0.15)",
							px: 1.2,
							py: 0.3,
							borderRadius: 3,
							fontSize: "0.78rem",
							fontWeight: 600,
							letterSpacing: "0.5px",
							color: "#ffffff",
							whiteSpace: "nowrap",
						}}
					>
						{selectedIndex + 1} / {total}
					</Typography>

					{/* Action Buttons */}
					<Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexShrink: 0 }}>
						{/* Zoom controls: desktop only */}
						<Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 0.5 }}>
							<Tooltip title="Zoom In (+)">
								<IconButton onClick={handleZoomIn} sx={{ color: "#ffffff", "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" } }} size="small">
									<ZoomInIcon fontSize="small" />
								</IconButton>
							</Tooltip>
							<Tooltip title="Zoom Out (-)">
								<IconButton onClick={handleZoomOut} sx={{ color: "#ffffff", "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" } }} size="small">
									<ZoomOutIcon fontSize="small" />
								</IconButton>
							</Tooltip>
							{zoomLevel !== 1 && (
								<Tooltip title="Reset Zoom (0)">
									<IconButton onClick={handleResetZoom} sx={{ color: "#ffffff", "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" } }} size="small">
										<RestartAltIcon fontSize="small" />
									</IconButton>
								</Tooltip>
							)}
						</Box>
						<Tooltip title="Open Original">
							<IconButton
								component="a"
								href={currentImage.url}
								target="_blank"
								rel="noopener noreferrer"
								sx={{ color: "#ffffff", "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" } }}
								size="small"
							>
								<OpenInNewIcon fontSize="small" />
							</IconButton>
						</Tooltip>
						<Tooltip title="Download">
							<IconButton
								component="a"
								href={currentImage.url}
								download={`${currentTitle.replace(/\s+/g, "_")}.jpg`}
								sx={{ color: "#ffffff", "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" } }}
								size="small"
							>
								<DownloadIcon fontSize="small" />
							</IconButton>
						</Tooltip>
						<Tooltip title="Close (Esc)">
							<IconButton
								onClick={onClose}
								sx={{
									color: "#ffffff",
									backgroundColor: "rgba(255,255,255,0.12)",
									"&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
									ml: 0.5,
								}}
								size="small"
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</Tooltip>
					</Box>
				</Box>

				{/* Full-width Title Row */}
				<Typography
					variant="subtitle1"
					sx={{
						fontWeight: 600,
						fontSize: { xs: "0.95rem", sm: "1.05rem" },
						color: "#ffffff",
						lineHeight: 1.3,
						width: "100%",
					}}
				>
					{currentTitle}
				</Typography>
			</Box>

			{/* Main Canvas Area */}
			<Box
				onTouchStart={handleTouchStart}
				onTouchEnd={handleTouchEnd}
				sx={{
					flex: 1,
					position: "relative",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					px: { xs: 1, sm: 6 },
					py: 1,
					overflow: "hidden",
					userSelect: "none",
				}}
			>
				{/* Left Navigation Button */}
				<IconButton
					onClick={handlePrev}
					sx={{
						position: "absolute",
						left: { xs: 8, sm: 24 },
						top: "50%",
						transform: "translateY(-50%)",
						backgroundColor: "rgba(0, 0, 0, 0.45)",
						color: "#ffffff",
						border: "1px solid rgba(255,255,255,0.2)",
						"&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)", borderColor: "#ffffff" },
						zIndex: 10,
						width: 46,
						height: 46,
					}}
					aria-label="Previous photo"
				>
					<ArrowBackIosNewIcon fontSize="small" />
				</IconButton>

				{/* Photo Image */}
				<Box
					component="img"
					key={currentImage.url}
					src={currentImage.url}
					alt={currentTitle}
					sx={{
						maxWidth: "88vw",
						maxHeight: "72vh",
						objectFit: "contain",
						borderRadius: "4px",
						boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
						transform: `scale(${zoomLevel})`,
						transition: "transform 0.2s ease, opacity 0.25s ease",
						cursor: zoomLevel > 1 ? "grab" : "default",
					}}
				/>

				{/* Right Navigation Button */}
				<IconButton
					onClick={handleNext}
					sx={{
						position: "absolute",
						right: { xs: 8, sm: 24 },
						top: "50%",
						transform: "translateY(-50%)",
						backgroundColor: "rgba(0, 0, 0, 0.45)",
						color: "#ffffff",
						border: "1px solid rgba(255,255,255,0.2)",
						"&:hover": { backgroundColor: "rgba(0, 0, 0, 0.8)", borderColor: "#ffffff" },
						zIndex: 10,
						width: 46,
						height: 46,
					}}
					aria-label="Next photo"
				>
					<ArrowForwardIosIcon fontSize="small" />
				</IconButton>
			</Box>

			{/* Bottom Thumbnail Strip Bar */}
			<Box
				sx={{
					px: 2,
					py: 1.5,
					background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
					display: "flex",
					justifyContent: "center",
					zIndex: 10,
				}}
			>
				<Box
					ref={thumbnailStripRef}
					sx={{
						display: "flex",
						gap: 1,
						overflowX: "auto",
						maxWidth: "100%",
						py: 0.5,
						px: 1,
						scrollbarWidth: "none",
						"&::-webkit-scrollbar": { display: "none" },
					}}
				>
					{images.map((img, idx) => {
						const isSelected = idx === selectedIndex;
						return (
							<Box
								key={idx}
								onClick={() => onSelectIndex(idx)}
								sx={{
									width: { xs: 50, sm: 64 },
									height: { xs: 38, sm: 48 },
									flexShrink: 0,
									borderRadius: 1,
									overflow: "hidden",
									cursor: "pointer",
									border: isSelected ? "2px solid #ffffff" : "2px solid transparent",
									opacity: isSelected ? 1 : 0.55,
									transition: "all 0.15s ease",
									transform: isSelected ? "scale(1.08)" : "scale(1)",
									"&:hover": {
										opacity: 0.9,
										borderColor: isSelected ? "#ffffff" : "rgba(255,255,255,0.5)",
									},
								}}
							>
								<img
									src={img.url}
									alt={formatPhotoTitle(img.title)}
									style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
									loading="lazy"
								/>
							</Box>
						);
					})}
				</Box>
			</Box>
		</Dialog>
	);
};

export default PhotoLightbox;
