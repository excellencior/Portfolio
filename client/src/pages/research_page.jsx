import { useState } from "react";
import { Link } from "react-router-dom";

const publications = [
	{
		id: "dengue-aerial-orthophoto",
		title: "Detection of Dengue Breeding Sites in Large-scale Landscapes Plagued by Unplanned Urban Development from Aerial Imagery and Remote Sensing with Deep Learning",
		authors: ["Apurbo Banik Turjo", "Sushmita Paul", "Dr. Anindya Iqbal"],
		venue: "Under Review / B.Sc. Undergraduate Thesis, Department of CSE, BUET",
		year: "2025",
		status: "Under Review",
		statusClass: "under-review",
		abstract: "Manual inspection of dengue mosquito breeding grounds in dense, unplanned urban metropolises is labor-intensive and unscalable. This work introduces a novel two-stage deep learning pipeline combining fine-tuned vision segmentation (SegGPT) and object detection models (YOLOv9/v11) coupled with an Oriented Bounding Box (OBB) spatial merging algorithm on high-resolution drone orthophotos. Evaluated on dense districts in Dhaka, our system achieves an 83.6% balanced accuracy and reduces manual physical inspection ground effort by 35% compared to conventional single-stage baselines.",
		bibtex: `@article{turjo2025dengue,
  title={Detection of Dengue Breeding Sites in Large-scale Landscapes Plagued by Unplanned Urban Development from Aerial Imagery and Remote Sensing with Deep Learning},
  author={Turjo, Apurbo Banik and Paul, Sushmita and Iqbal, Anindya},
  journal={Under Review (B.Sc. Thesis, BUET)},
  year={2025}
}`,
		links: {
			project: "/projects",
		}
	},
	{
		id: "slm-long-horizon-context",
		title: "A Diagnostic Study on Long-Horizon Compounding Context Utilization in Small Language Models (SLMs)",
		authors: ["Apurbo Banik Turjo"],
		venue: "Work in Progress / Independent Diagnostic Study",
		year: "2026",
		status: "Work in Progress",
		statusClass: "in-progress",
		abstract: "As Small Language Models (<= 7B parameters) become pervasive for local deployment and edge assistants, their ability to sustain coherent reasoning over compounding context horizons degrades sharply. This study investigates the manifestation of Lost-in-the-Middle, recency bias, and depth ceilings in SLMs during multi-turn long-horizon interactions, evaluating whether structured cueing mechanisms can improve sustained reasoning.",
		bibtex: `@article{turjo2026slmcontext,
  title={A Diagnostic Study on Long-Horizon Compounding Context Utilization in Small Language Models (SLMs)},
  author={Turjo, Apurbo Banik},
  journal={Work in Progress},
  year={2026}
}`
	},
	{
		id: "optimistic-rag-enterprise",
		title: "Architecture and Memory Persistence for Scalable Multi-Horizon Enterprise AI Systems",
		authors: ["Apurbo Banik Turjo"],
		venue: "Therap (BD) Ltd. AI Systems Group",
		year: "2025",
		status: "System Report",
		statusClass: "system",
		abstract: "Engineered an enterprise-grade AI hub supporting configurable Optimistic RAG knowledge retrieval, persistent long-horizon chat memory, sandboxed code execution, and AI-powered longitudinal health data trend analytics.",
		bibtex: `@misc{turjo2025optimisticrag,
  title={Architecture and Memory Persistence for Scalable Multi-Horizon Enterprise AI Systems},
  author={Turjo, Apurbo Banik},
  howpublished={Therap AI Systems Technical Report},
  year={2025}
}`,
		links: {
			project: "/projects"
		}
	},
	{
		id: "biobert-ddxplus",
		title: "Predictive Clinical Diagnostic Profile Estimation via Pretrained BioBERT on ddxplus",
		authors: ["Apurbo Banik Turjo"],
		venue: "Applied Machine Learning Prototype, BUET",
		year: "2025",
		status: "Prototype",
		statusClass: "system",
		abstract: "Built personalized predictive diagnostic profiles based on medical history, demographic priors, and real-time observed symptoms by fine-tuning BioBERT on clinical symptom datasets (ddxplus).",
		bibtex: `@misc{turjo2025biobert,
  title={Predictive Clinical Diagnostic Profile Estimation via Pretrained BioBERT on ddxplus},
  author={Turjo, Apurbo Banik},
  howpublished={GitHub: ML-Project---bioBERT},
  year={2025}
}`,
		links: {
			code: "https://github.com/excellencior/ML-Project---bioBERT"
		}
	}
];

const PaperItem = ({ paper }) => {
	const [showAbstract, setShowAbstract] = useState(false);
	const [showBibtex, setShowBibtex] = useState(false);
	const [copiedBib, setCopiedBib] = useState(false);

	const handleCopyBib = () => {
		navigator.clipboard.writeText(paper.bibtex);
		setCopiedBib(true);
		setTimeout(() => setCopiedBib(false), 2000);
	};

	return (
		<li className="publication-entry" style={{ listStyleType: "decimal", marginBottom: "1.6rem" }}>
			<div className="pub-title">
				{paper.title}
				{paper.status && (
					<span className={`status-pill ${paper.statusClass || "system"}`}>
						{paper.status}
					</span>
				)}
			</div>
			<div className="pub-authors">
				{paper.authors.map((author, idx) => (
					<span key={idx}>
						{author === "Apurbo Banik Turjo" ? <b>{author}</b> : author}
						{idx < paper.authors.length - 1 && ", "}
					</span>
				))}
			</div>
			<div className="pub-venue">
				{paper.venue} ({paper.year})
			</div>

			<div className="pub-links">
				{paper.links?.paper && (
					<a href={paper.links.paper} target="_blank" rel="noopener noreferrer">
						[Paper]
					</a>
				)}
				{paper.links?.code && (
					<a href={paper.links.code} target="_blank" rel="noopener noreferrer">
						[Code]
					</a>
				)}
				{paper.links?.project && (
					<Link to={paper.links.project}>
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
				{paper.bibtex && (
					<button
						type="button"
						onClick={() => setShowBibtex(!showBibtex)}
					>
						[{showBibtex ? "Hide BibTeX" : "BibTeX"}]
					</button>
				)}
			</div>

			{showAbstract && (
				<div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", backgroundColor: "#f8fafc", borderLeft: "3px solid var(--primary-color)", borderRadius: "4px", fontSize: "0.9rem", lineHeight: 1.6, textAlign: "justify" }}>
					{paper.abstract}
				</div>
			)}

			{showBibtex && (
				<div className="bibtex-container">
					<div className="bibtex-header">
						<span>BIBTEX ENTRY</span>
						<button type="button" className="bibtex-copy-btn" onClick={handleCopyBib}>
							{copiedBib ? "✓ Copied!" : "Copy BibTeX"}
						</button>
					</div>
					<pre>
						<code>{paper.bibtex}</code>
					</pre>
				</div>
			)}
		</li>
	);
};

const Research = () => {
	return (
		<div>
			<h2>Research</h2>

			<p>
				My primary research spans <b>Small Language Models (SLMs)</b>, investigating compounding context utilization and attention degradation modes in long-horizon reasoning, as well as <b>Computer Vision & Remote Sensing</b> for public health urban monitoring.
			</p>

			<h3>Publications & Preprints</h3>
			<ol style={{ paddingLeft: "1.5rem" }}>
				{publications.map((paper) => (
					<PaperItem key={paper.id} paper={paper} />
				))}
			</ol>
		</div>
	);
};

export default Research;
