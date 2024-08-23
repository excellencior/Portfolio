import React from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

const ProjectCard = (project) => {
	const { title, description, imageurl, link, tags } = project;

	return (
		<Grid
			container
			component={Link}
			to={link}
			sx={{
				width: "100%",
				height: "400px",
				position: "relative",

				backgroundSize: "cover",
				backgroundPosition: "center",
				overflow: "hidden",
				borderRadius: "10px",
				cursor: "pointer",
				color: "white",
				padding: 2,
				textDecoration: "none",

				backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageurl})`, // Initial dark shade
				"&:hover": {
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${imageurl})`, // Darker shade on hover
				},

				"&:hover .description": {
					opacity: 1,
					transform: "translateY(0)", // Slide up on hover
				},
			}}
		>
			<Grid item xs={12}>
				{/* Title Section */}
				<Typography variant="h3">{title}</Typography>
			</Grid>

			{/* Description Section */}
			<Grid
				item
				xs={12}
				className="description"
				sx={{
					opacity: { xs: 1, sm: 0 }, 
					transform: { xs: "translateY(0)", sm: "translateY(50px)" }, // No transform on xs
					transition: "opacity 0.2s ease, transform 0.5s ease",
					height: "calc(100% - 100px)",
					overflowY: "auto",
					mt: 2,
				}}
			>
				<Typography variant="h5">{description}</Typography>
			</Grid>

			{/* Tags Section */}
			<Grid item xs={12} alignItems="flex-end" marginBottom={1}>
				{tags.map((tag) => (
					<Typography
						variant="caption"
						key={tag}
						fontWeight="bold"
						sx={{
							"&:not(:last-child)": {
								marginRight: "10px",
							},
						}}
					>
						{tag}
					</Typography>
				))}
				{/* Two far ends */}
				<Box sx={{ flexGrow: 1 }} />
				<Typography variant="caption" sx={{ paddingTop: 1 }}>
					Click to open Github Repository
				</Typography>
			</Grid>
		</Grid>
	);
};

export default ProjectCard;
