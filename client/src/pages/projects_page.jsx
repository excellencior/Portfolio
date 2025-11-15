import React from "react";
import Projects from "../consts/projects/projects";
import ProjectCard from "../components/projectCard";
import { Stack, Typography } from "@mui/material";
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const toRoman = (num) => {
	const roman = [
		["M", 1000],
		["CM", 900],
		["D", 500],
		["CD", 400],
		["C", 100],
		["XC", 90],
		["L", 50],
		["XL", 40],
		["X", 10],
		["IX", 9],
		["V", 5],
		["IV", 4],
		["I", 1],
	];

	let result = "";
	for (let [letter, value] of roman) {
		while (num >= value) {
			result += letter;
			num -= value;
		}
	}
	return result;
};

const ProjectsSection = () => {
	return (
		<Stack spacing={3} className="animate-slide-up">
			{Projects.map((project, index) => (
				<div key={project.id}>
					<Typography variant="h6" fontWeight="bold" mb={1}>
						<AccountTreeIcon /> Project [{toRoman(project.id)}]
					</Typography>
					<ProjectCard {...project} />
				</div>
			))}
		</Stack>
	);
};

export default ProjectsSection;