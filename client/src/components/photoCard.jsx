import { useState } from "react";
import { Dialog, IconButton, Typography, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const formatPhotoTitle = (rawTitle) => {
	if (!rawTitle) return "Photo";
	return rawTitle
		.replace(/_/g, " ")
		.replace(/-/g, " ")
		.replace(/\.[^/.]+$/, "")
		.replace(/\b\w/g, (char) => char.toUpperCase());
};

const PhotoCard = ({ image }) => {
	const [open, setOpen] = useState(false);
	const cleanTitle = formatPhotoTitle(image.title);

	return (
		<>
			<div className="photo-card-item" onClick={() => setOpen(true)}>
				<div className="photo-img-wrapper">
					<img src={image.url} alt={cleanTitle} loading="lazy" />
				</div>
				<div className="photo-info">
					<p className="photo-title">{cleanTitle}</p>
					<p className="photo-sub">Click to enlarge</p>
				</div>
			</div>

			{/* Lightbox Modal */}
			<Dialog
				open={open}
				onClose={() => setOpen(false)}
				maxWidth="lg"
				PaperProps={{
					sx: {
						backgroundColor: "transparent",
						boxShadow: "none",
						overflow: "hidden",
						margin: 1,
					},
				}}
			>
				<Box
					sx={{
						position: "relative",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						backgroundColor: "#ffffff",
						borderRadius: 2,
						p: { xs: 1.5, sm: 2 },
						boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
					}}
				>
					<IconButton
						onClick={() => setOpen(false)}
						sx={{
							position: "absolute",
							top: 8,
							right: 8,
							backgroundColor: "rgba(0,0,0,0.6)",
							color: "#ffffff",
							"&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
							zIndex: 10,
						}}
						size="small"
					>
						<CloseIcon fontSize="small" />
					</IconButton>

					<Box
						component="img"
						src={image.url}
						alt={cleanTitle}
						sx={{
							maxWidth: "90vw",
							maxHeight: "80vh",
							objectFit: "contain",
							borderRadius: 1,
							display: "block",
						}}
					/>

					<Typography
						variant="subtitle1"
						sx={{
							mt: 1.5,
							fontWeight: 600,
							color: "#222",
							textAlign: "center",
						}}
					>
						{cleanTitle}
					</Typography>
				</Box>
			</Dialog>
		</>
	);
};

export default PhotoCard;
