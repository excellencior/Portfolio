import { Link } from "react-router-dom";
import Mydescription from "../consts/bio/mydescription";
import life_updates from "../consts/bio/life_updates";

const Bio = () => {
	const recentUpdates = life_updates.slice(0, 5);

	return (
		<div>
			<h2>About Me</h2>

			<img
				className="floatLeft"
				src={Mydescription.profilephoto}
				alt={Mydescription.name}
				width="220"
				style={{ maxWidth: "220px", height: "auto" }}
			/>

			<div
				dangerouslySetInnerHTML={{ __html: Mydescription.description }}
				style={{ lineHeight: 1.7, textAlign: "justify" }}
			/>

			<div style={{ clear: "both", paddingTop: "1rem" }}>
				<h3>Research Interests</h3>
				<ul style={{ margin: "0.5rem 0 1.5rem", paddingLeft: "1.5rem" }}>
					{Mydescription.researchInterests.map((interest) => (
						<li key={interest} style={{ marginBottom: "0.35rem" }}>
							<b>{interest}</b>
						</li>
					))}
				</ul>

				<h3>Recent News & Updates</h3>
				<ul style={{ margin: "0.5rem 0 1.5rem", paddingLeft: "1.5rem" }}>
					{recentUpdates.map((update) => (
						<li key={update.id} style={{ marginBottom: "0.5rem" }}>
							<b>[{update.date}]</b> {update.title}: <span>{update.description}</span>
						</li>
					))}
				</ul>
				<p>
					<Link to="/updates">» View all updates & timeline</Link>
				</p>

				<h3>Profiles & Correspondence</h3>
				<ul style={{ margin: "0.5rem 0 1rem", paddingLeft: "1.5rem" }}>
					<li>
						<b>Email:</b> <a href="mailto:turjob44@gmail.com">turjob44@gmail.com</a>
					</li>
					<li>
						<b>GitHub:</b> <a href="https://github.com/excellencior" target="_blank" rel="noopener noreferrer">github.com/excellencior</a>
					</li>
					<li>
						<b>LinkedIn:</b> <a href="https://www.linkedin.com/in/apurbo-banik-turjo-86b5b3328" target="_blank" rel="noopener noreferrer">linkedin.com/in/apurbo-banik-turjo-86b5b3328</a>
					</li>
					<li>
						<b>Resume / CV:</b> <a href="/cv.pdf" download="Apurbo_Banik_Turjo_CV.pdf">Download PDF</a>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Bio;
