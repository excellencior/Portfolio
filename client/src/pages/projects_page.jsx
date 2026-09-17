import { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get("/api/projects")
			.then((res) => setProjects(res.data))
			.catch((err) => console.error("Failed to fetch projects:", err))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <div><h2>Software Projects</h2><div className="spinner-container"><div className="spinner" /></div></div>;

	return (
		<section>
			<h2>Software Projects</h2>

			<ol className="projects-list">
				{projects.map((project) => (
					<li key={project.id} className="project-item">
						<div className="project-copy">
							<h3 className="project-title">{project.title}</h3>
							{project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
							<p className="project-description">{project.description}</p>
							<p className="project-tech">
								<b>Tech Stack:</b> {project.tags?.join(", ")} {project.date && `(${project.date})`}
							</p>
							<nav className="pub-links">
								{project.repo_link ? (
									<a href={project.repo_link} target="_blank" rel="noopener noreferrer">[Source Code / GitHub]</a>
								) : (
									<span style={{ color: "#777", fontSize: "0.85rem" }}>[Repo: Institutional / Under Review]</span>
								)}
								{project.deployed_at && (
									<a href={`https://${project.deployed_at.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer">[Live Demo / Website]</a>
								)}
							</nav>
						</div>
						{project.image_url && (
							<img
								className="project-image"
								src={project.image_url}
								alt={`${project.title} preview`}
								loading="lazy"
							/>
						)}
					</li>
				))}
			</ol>
		</section>
	);
};

export default Projects;
