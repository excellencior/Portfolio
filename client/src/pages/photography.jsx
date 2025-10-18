import { useState, useEffect } from "react";
import PhotoCard from "../components/photoCard";
import { Grid } from "@mui/material";
import Grow from "@mui/material/Grow";

const Photography = () => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const res = await fetch("http://localhost:4000/photography/photos");
				const data = await res.json();
				setImages(data);
			} catch (error) {
				console.error("Error fetching images:", error);
			}
		};

		fetchImages();

		// Optional: refresh signed URLs periodically (e.g., every 4 minutes)
		const interval = setInterval(fetchImages, 4 * 60 * 1000);
		
		return () => clearInterval(interval);

	}, []);

	return (
		<Grid container spacing={5}>
			{images.map((image, index) => (
				<Grow in={true} timeout={1000} key={index}>
					<Grid item xs={12} sm={6} md={5}>
						<PhotoCard image={image} />
					</Grid>
				</Grow>
			))}
		</Grid>
	);
};

export default Photography;
