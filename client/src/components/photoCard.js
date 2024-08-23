import React, { useState } from "react";
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Backdrop,
} from "@mui/material";
import Grow from "@mui/material/Grow";

const PhotoCard = ({ image }) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Card sx={{ maxWidth: 345 }}>
				<CardActionArea onClick={() => setOpen(true)}>
					<CardMedia
						component="img"
						height="200px"
						width="auto"
						image={image.url}
						alt={image.title}
					/>
					<CardContent>
						<Typography variant="h5" component="div">
							{image.title}
						</Typography>
						<Typography variant="body2">Click to view full size</Typography>
					</CardContent>
				</CardActionArea>
			</Card>

			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={() => setOpen(false)}
			>
				<Grow in={open}>
					<img
						src={image.url}
						alt={image.title}
						style={{
							width: "auto",
							maxHeight: "80vh", // Adjust based on your preference
							display: "block",
							margin: "0 auto",
							borderRadius: "5px",
							border: "solid 2px",
							borderColor: "white",
						}}
					/>
				</Grow>
			</Backdrop>
		</>
	);
};

export default PhotoCard;
