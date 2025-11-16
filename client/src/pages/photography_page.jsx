import { useState, useEffect } from "react";
import PhotoCard from "../components/photoCard";
import { Grid } from "@mui/material";
import Grow from "@mui/material/Grow";
import axios from "axios";

const Photography = () => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const res = await axios.get("/photography/photos");
				setImages(res.data);

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
					<Grid size={{ xs:12, sm:6, md:5}}>
						<PhotoCard image={image} />
					</Grid>
				</Grow>
			))}
		</Grid>
	);
};

export default Photography;
