import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Bio = () => {
	const [bio, setBio] = useState(null);
	const [recentUpdates, setRecentUpdates] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Promise.all([
			axios.get("/api/bio"),
			axios.get("/api/life-updates"),
		])
			.then(([bioRes, updatesRes]) => {
				setBio(bioRes.data);
				setRecentUpdates(updatesRes.data.slice(0, 5));
			})
			.catch((err) => console.error("Failed to fetch bio data:", err))
			.finally(() => setLoading(false));
	}, []);

	if (loading || !bio) return <div><h2>About Me</h2><div className="spinner-container"><div className="spinner" /></div></div>;

	return (
		<div>
			<h2>About Me</h2>

			<img
				className="floatLeft"
				src={bio.profile_photo}
				alt={bio.name}
				width="220"
				style={{ maxWidth: "220px", height: "auto" }}
			/>

			<div
				dangerouslySetInnerHTML={{ __html: bio.description }}
				style={{ lineHeight: 1.7, textAlign: "justify" }}
			/>

			<div style={{ clear: "both", paddingTop: "1rem" }}>
				<h3>Research Interests</h3>
				<ul style={{ margin: "0.5rem 0 1.5rem", paddingLeft: "1.5rem" }}>
					{bio.research_interests.map((interest) => (
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
