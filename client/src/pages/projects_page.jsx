import projects from "../consts/projects/projects";

const Projects = () => {
	return (
		<section>
			<h2>Software Projects</h2>

			<ol className="projects-list">
				{projects.map((project) => (
					<li key={project.id} className="project-item">
						<h3 className="project-title">
							{project.title}
						</h3>

						<p className="project-description">
							{project.description}
						</p>

						<p className="project-tech">
							<b>Tech Stack:</b> {project.tags?.join(", ")} {project.date && `(${project.date})`}
						</p>

						<nav className="pub-links">
							{project.repoLink ? (
								<a href={project.repoLink} target="_blank" rel="noopener noreferrer">
									[Source Code / GitHub]
								</a>
							) : (
								<span style={{ color: "#777", fontSize: "0.85rem" }}>
									[Repo: Institutional / Under Review]
								</span>
							)}
							{project.deployedAt && (
								<a href={`https://${project.deployedAt.replace(/^https?:\/\//, "")}`} target="_blank" rel="noopener noreferrer">
									[Live Demo / Website]
								</a>
							)}
						</nav>
					</li>
				))}
			</ol>
		</section>
	);
};

export default Projects;