import React from "react";
import Projects from "../consts/projects/projects";
import ProjectCard from "../components/projectCard";
import { Grid2, Typography } from "@mui/material";

const ProjectsSection = () => {
	return (
		<Grid2 container spacing={3} className="animate-slide-up">
			{Projects.map((project, index) => (
				<Grid2 size={{ xs:12, md:6, lg:4}} key={project.id}>
					<Typography variant="h6" fontWeight="bold" mb={1}>
						Project - {index + 1}
					</Typography>
					<ProjectCard {...project} />
				</Grid2>
			))}
		</Grid2>
	);
};

export default ProjectsSection;

