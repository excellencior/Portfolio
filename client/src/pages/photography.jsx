import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import PhotoCard from "../components/photoCard";
import { Grid } from "@mui/material";
import axios from "axios";

const Photography = () => {
	const [images, setImages] = useState([]);

	useEffect(() => {
		const initializeSupabaseAndFetchImages = async () => {
			try {
				// Initialize Supabase
				const response = await axios.get("/supabase-config");
				const { supabaseUrl, supabaseKey } = response.data;
				console.log(response.data);
				console.log("Response: ", response);
				console.log(supabaseUrl);
				console.log(supabaseKey);
				const supabase = createClient(supabaseUrl, supabaseKey);

				// Fetch images
				const { data, error } = await supabase.storage
					.from("Photography")
					.list("public", { limit: 100 });

				if (error) {
					console.error("Error fetching images:", error);
				} else {
					const imageObjects = data.map((file) => ({
						title: file.name.split(".")[0],
						url: supabase.storage
							.from("Photography")
							.getPublicUrl("public/" + file.name).data.publicUrl,
					}));
					setImages(imageObjects);
				}
			} catch (error) {
				console.error("Error initializing Supabase or fetching images:", error);
			}
		};

		initializeSupabaseAndFetchImages();
	}, []);

	return (
		<Grid container spacing={5} className="animate-slide-up">
			{images.map((image, index) => (
				<Grid item xs={12} sm={6} md={5} key={index}>
					<PhotoCard image={image} />
				</Grid>
			))}
		</Grid>
	);
};

export default Photography;
