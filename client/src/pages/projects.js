import React from "react";
import Projects from "../consts/projects/projects";
import ProjectCard from "../components/projectCard";
import { Grid, Typography } from "@mui/material";

const projects = () => {
	return (
		<>
			<Grid container spacing={3} className="animate-slide-up">
				{Projects.map((project, index) => (
					<>
						<Grid item xs={8} md={10}>
							<Typography variant="h6" fontWeight="bold">
								Project - {index + 1}
							</Typography>
							<ProjectCard key={project.id} {...project} />
						</Grid>
					</>
				))}
			</Grid>
		</>
	);
};

export default projects;
