import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const PaperItem = ({ paper }) => {
	const [showAbstract, setShowAbstract] = useState(false);
	const title = paper.id === "slm-long-horizon-context"
		? "Diagnosing SLMs under Incremental Observations"
		: paper.title;
	const authors = paper.id === "slm-long-horizon-context"
		? [
			{ name: "Apurbo Banik Turjo", isHighlighted: true },
			{ name: "Sushmita Paul", isHighlighted: true },
			{ name: "Dr. Ch. Md. Rakin Haider", isHighlighted: false },
		]
		: paper.authors;
	const venue = paper.id === "slm-long-horizon-context"
		? "Independent Diagnostic Study"
		: paper.id === "dengue-aerial-orthophoto"
			? "B.Sc. Undergraduate Thesis, Department of CSE, BUET"
			: paper.id === "biobert-ddxplus"
				? "Machine Learning Lab, BUET"
		: paper.venue;
	const statusLabel = paper.id === "biobert-ddxplus"
		? null
		: /^work in progress$/i.test(paper.status || "") ? "WiP" : paper.status;

	return (
		<li className="publication-entry" style={{ listStyleType: "decimal", marginBottom: "1.6rem" }}>
			<div className="pub-title">
				{title}
				{statusLabel && (
					<span className={`status-pill ${paper.status_class || "in-progress"} ${statusLabel === "WiP" ? "status-pill-compact" : ""}`}>
						{statusLabel}
					</span>
				)}
			</div>
			<div className="pub-authors">
				{authors.map((author, idx) => (
					<span key={idx}>
						{author.isSelf || author.isHighlighted ? <b>{author.name}</b> : author.name}
						{idx < authors.length - 1 && ", "}
					</span>
				))}
			</div>
			<div className="pub-venue">
				{venue} ({paper.year})
			</div>

			<div className="pub-links">
				{paper.link_paper && (
					<a href={paper.link_paper} target="_blank" rel="noopener noreferrer">
						[Paper]
					</a>
				)}
				{paper.link_code && (
					<a href={paper.link_code} target="_blank" rel="noopener noreferrer">
						[Code]
					</a>
				)}
				{paper.link_project && paper.id !== "dengue-aerial-orthophoto" && (
					<Link to={paper.link_project}>
						[Project Page]
					</Link>
				)}
				{paper.abstract && (
					<button
						type="button"
						onClick={() => setShowAbstract(!showAbstract)}
					>
						[{showAbstract ? "Hide Abstract" : "Abstract"}]
					</button>
				)}
			</div>

			{showAbstract && (
				<div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", backgroundColor: "#f8fafc", borderLeft: "3px solid var(--primary-color)", borderRadius: "4px", fontSize: "0.9rem", lineHeight: 1.6, textAlign: "justify" }}>
					{paper.abstract}
				</div>
			)}
		</li>
	);
};

const Research = () => {
	const [publications, setPublications] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get("/api/publications")
			.then((res) => setPublications(res.data))
			.catch((err) => console.error("Failed to fetch publications:", err))
			.finally(() => setLoading(false));
	}, []);

	return (
		<div>
			<h2>Research</h2>

			<p>
				My primary research spans <b>Small Language Models (SLMs)</b>, investigating compounding context utilization and attention degradation modes in long-horizon reasoning, as well as <b>Computer Vision & Remote Sensing</b> for public health urban monitoring.
			</p>

			<h3>Publications / Preprints</h3>
			{loading ? (
				<div className="spinner-container"><div className="spinner" /></div>
			) : (
				<ol style={{ paddingLeft: "1.5rem" }}>
					{publications.map((paper) => (
						<PaperItem key={paper.id} paper={paper} />
					))}
				</ol>
			)}
		</div>
	);
};

export default Research;
