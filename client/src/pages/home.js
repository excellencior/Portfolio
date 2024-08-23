import React from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ProfilePhoto from "../assets/images/profile.jpeg";

const Home = () => {
	return (
		<Container maxWidth="xl" sx={{ mt: 8 }}>
			<Grid container spacing={4} alignItems="center">
				{/* Left side: Text content */}
				<Grid item xs={12} md={6} textAlign="left">
					<Typography
						variant="h4"
						component="h5"
						sx={{ mb: 2, color: "#333" }}
					>
						Hi, I'am{" "}
						<span style={{ color: "darkorange" }}><b>Apurbo Banik Turjo</b></span>
					</Typography>
					<Typography variant="h6" sx={{ color: "#333", mb: 4 }}>
						Currently studying Computer Science & Engineering in Bangladesh
						University of Engineering and Technology (BUET)
					</Typography>
					<Button
						component={Link}
						to="/contact"
						color="secondary"
						variant="outlined"
						sx={{borderRadius: "20px", "&:hover": {backgroundColor: "orange", color: "#fff", borderColor: "orange"}}}	
					>
						View CV
					</Button>
				</Grid>

				{/* Right side: Image */}
				<Grid item xs={12} md={6} display="flex" justifyContent="center">
					<Box
						component="img"
						src={ProfilePhoto} // Replace with the actual path to your image
						alt="Your Photo"
						sx={{
							width: "100%",
							maxWidth: "400px",
							borderRadius: "50%",
							// boxShadow: 3,
							backgroundColor: "transparent",
							padding: "20px",
						}}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Home;
