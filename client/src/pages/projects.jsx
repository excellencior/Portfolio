import React from "react";
import Projects from "../consts/projects/projects";
import ProjectCard from "../components/projectCard";
import { Grid, Typography } from "@mui/material";

const ProjectsSection = () => {
	return (
		<Grid container spacing={3} className="animate-slide-up">
			{Projects.map((project, index) => (
				<Grid item xs={12} md={6} lg={4} key={project.id}>
					<Typography variant="h6" fontWeight="bold" mb={1}>
						Project - {index + 1}
					</Typography>
					<ProjectCard {...project} />
				</Grid>
			))}
		</Grid>
	);
};

export default ProjectsSection;

