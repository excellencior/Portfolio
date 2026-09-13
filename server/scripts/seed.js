import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });

import { supabaseUpsert } from "../src/supabase.js";

// Publications (richer schema, merged from current research_page.jsx + consts)
const publications = [
	{
		id: "slm-long-horizon-context",
		title: "Diagnosing SLMs under Incremental Observations",
		authors: [
			{ name: "Apurbo Banik Turjo", isSelf: true, isHighlighted: true },
			{ name: "Sushmita Paul", isSelf: false, isHighlighted: true },
			{ name: "Dr. Ch. Md. Rakin Haider", isSelf: false, isHighlighted: false }
		],
		venue: "Independent Diagnostic Study",
		venue_details: "Independent Research and Diagnostic Evaluation",
		year: "2026",
		status: "WiP",
		status_class: "in-progress",
		selected: true,
		category: "Natural Language Processing and Small Language Models",
		image_url: "/images/machine-learning.jpg",
		abstract: "As Small Language Models (<= 7B parameters) become pervasive for local deployment and edge assistants, their ability to sustain coherent reasoning over compounding context horizons degrades sharply. This study investigates the manifestation of Lost-in-the-Middle, recency bias, and depth ceilings in SLMs during multi-turn long-horizon interactions, evaluating whether structured cueing mechanisms can improve sustained reasoning.",
		highlights: [
			"Benchmarking 1B-7B parameter SLMs on compound multi-turn retrieval and reasoning",
			"Quantifying attention degradation, recency bias, and depth ceiling failure modes",
			"Evaluating lightweight cueing and structured memory injection strategies"
		],
		tags: ["Small Language Models", "Long-Horizon Reasoning", "Lost in the Middle", "Context Degradation", "Attention Cueing"],
		sort_order: 1,
	},
	{
		id: "icortex-clinical-intelligence",
		title: "ICortex: Proactive Clinical Intelligence via Supervisor-Specialist Agentic Architecture",
		authors: [{ name: "Apurbo Banik Turjo", isSelf: true }],
		venue: "Therap (BD) Ltd. AI Systems Group",
		venue_details: "Therap (BD) Ltd. AI Systems Group",
		year: "2025-2026",
		status: "WiP",
		status_class: "in-progress",
		selected: true,
		category: "AI Systems Engineering",
		abstract: "Designed and built an autonomous clinical decision-support engine that continuously tracks longitudinal health data (seizures, vital signs, blood glucose, behaviors, intake/elimination) for individuals receiving care. The system employs a supervisor-specialist multi-agent architecture powered by Google Gemini: a Flash-based orchestrator for real-time event triage, Pro-based specialists for deep trend analysis and cross-domain clinical correlation detection, and a deterministic trend direction pipeline with statistical guardrails that fast-paths stable metrics to reduce latency and token overhead. Includes per-metric finding reconciliation with immutable audit revisions, nightly agent memory consolidation, RAG semantic search over Oracle vector embeddings, and an interactive SSE-streamed caregiver chat assistant with dynamic tool calling for clinical information retrieval and primary health recommendations.",
		highlights: [
			"Supervisor-specialist multi-agent architecture with Google Gemini Flash and Pro",
			"Deterministic trend direction pipeline with statistical guardrails",
			"RAG semantic search over Oracle vector embeddings with interactive SSE-streamed chat"
		],
		tags: ["Multi-Agent AI", "Healthcare AI", "Google Gemini", "RAG", "Clinical Intelligence"],
		sort_order: 2,
	},
	{
		id: "dengue-aerial-orthophoto",
		title: "Detection of Dengue Breeding Sites in Large-scale Landscapes Plagued by Unplanned Urban Development from Aerial Imagery and Remote Sensing with Deep Learning",
		authors: [
			{ name: "Apurbo Banik Turjo", isSelf: true },
			{ name: "Sushmita Paul", isSelf: false },
			{ name: "Dr. Anindya Iqbal", isSelf: false }
		],
		venue: "B.Sc. Undergraduate Thesis, Department of CSE, BUET",
		venue_details: "Department of Computer Science and Engineering, Bangladesh University of Engineering and Technology (BUET)",
		year: "2025",
		status: "Under Review",
		status_class: "under-review",
		selected: true,
		category: "Computer Vision and Remote Sensing",
		image_url: "/images/orthophoto_r83_preview.png",
		abstract: "Background: Early detection of dengue breeding sites is crucial for controlling outbreaks in dense urban landscapes. However, unplanned development and poorly managed waste disposal practices not only render manual building inspections for breeding interventions highly labor-intensive (neither scalable nor cost-effective), but also affect the accuracy of existing aerial imaging based detection techniques. This paper presents a novel method for autonomously detecting dengue breeding objects on building rooftops from remote sensing with state-of-the-art deep learning models to identify potential geo-location targets for scalable manual building inspections with high detection accuracy and reduced costs. It deploys statistical, image processing, and machine learning countermeasures to effectively address the low accuracy of object detection and building segmentation models due to the adverse impact of imperfections in geometrically corrected aerial images and indistinguishable building boundaries in unplanned urban development. Methods: A novel two-stage process is proposed to classify risky building segments by decoupling object detection from building segmentation. In the first stage, two separate deep learning models are trained for independently detecting dengue breeding objects and segmenting individual buildings. In the second stage, their outputs are fused with spatial containment analysis to identify risky building segments. A distance-based search strategy is then employed around the geo-centers of these risky segments to guide scalable manual building inspections. Results: Manual building inspections guided by the two-stage process are superior in both precision and cost-effectiveness to those guided by an alternative one-stage process, where a single model is trained to perform detection and classification jointly. When trained and tested with orthophotos from two dengue-prone districts in Dhaka, one of the largest and most densely populated cities in the world, the proposed two-stage process has achieved a balanced accuracy of 83.6% in identifying risky buildings, with a 35% reduction in labor costs for manual inspections. In contrast, the one-stage process has achieved a balanced accuracy of only 69.5%. Conclusions: The proposed two-stage process enables scalable and cost-effective manual building inspections for dengue breeding interventions in urban landscapes, offering a practical tool for public health authorities to improve early detection and intervention.",
		highlights: [
			"Two-stage pipeline: Building footprint segmentation + Micro breeding object detection + OBB spatial merging",
			"Achieved 83.6% balanced accuracy on high-density unplanned urban environments",
			"35% reduction in physical health inspector field traversal effort"
		],
		tags: ["Computer Vision", "Remote Sensing", "YOLOv11", "SegGPT", "OBB Merging", "Urban Health AI"],
		sort_order: 3,
	},
	{
		id: "biobert-ddxplus",
		title: "Predictive Clinical Diagnostic Profile Estimation via Pretrained BioBERT on ddxplus",
		authors: [{ name: "Apurbo Banik Turjo", isSelf: true }],
		venue: "Machine Learning Lab, BUET",
		venue_details: "Machine Learning Lab, BUET",
		year: "2025",
		status: null,
		status_class: null,
		selected: false,
		category: "Applied Machine Learning and Healthcare",
		image_url: "/images/machine-learning.jpg",
		abstract: "Built personalized predictive diagnostic profiles based on medical history, demographic priors, and real-time observed symptoms by fine-tuning BioBERT on clinical symptom datasets (ddxplus).",
		highlights: [
			"Fine-tuned domain-specific BioBERT on structured clinical symptom matrices",
			"Probabilistic multi-label classification output for differential diagnosis"
		],
		tags: ["BioBERT", "Healthcare AI", "Clinical NLP", "Fine-Tuning", "Probabilistic Diagnosis"],
		link_code: "https://github.com/excellencior/ML-Project---bioBERT",
		sort_order: 4,
	}
];

// Projects
const projects = [
	{ id: 11, title: "Its Eze", category: "Systems & Full Stack", date: "May, 2026", subtitle: "Interactive AI & Deep Learning Knowledge Base", description: "An interactive AI and deep-learning knowledge base with illustrated explainers, KaTeX, paper references, inline visualizations, and 3D architecture explorations. Covers foundational concepts, modern model architectures, reasoning methods, RAG, and prompting strategies.", image_url: null, repo_link: "https://github.com/excellencior/itseze", deployed_at: "itseze.vercel.app", tags: ["React 19", "Vite", "Three.js", "React Three Fiber", "KaTeX", "Interactive Visualizations"], sort_order: 1 },
	{ id: 12, title: "Scholman", category: "Systems & Full Stack", date: "May, 2026", subtitle: "Interactive Dashboard for CS Institution Rankings", description: "An interactive CSRankings dashboard with filters for 27 research fields, regions, year ranges, and institution search. It reproduces the official geometric-mean ranking method using PostgreSQL data ingested from the CSRankings repository.", image_url: null, repo_link: "https://github.com/excellencior/Scholar-View-CSRankings", deployed_at: "scholman.vercel.app", tags: ["React", "Vite", "Express", "PostgreSQL", "Neon", "Material UI", "DataGrid"], sort_order: 2 },
	{ id: 10, title: "FitForge", category: "Systems & Full Stack", date: "June, 2026", subtitle: "Strength Training & Bangladeshi Nutrition Companion", description: "A mobile-first strength-training and Bangladeshi nutrition companion with workout-cycle planning, a 67+ exercise library, bilingual food search, meal and macro tracking, progression charts, and personal records. Built with React and packaged for Android using Capacitor.", image_url: null, repo_link: "https://github.com/excellencior/FitForge", deployed_at: null, tags: ["React 19", "Vite", "Capacitor 8", "Chart.js", "Lucide React", "Android APK", "Local-First"], sort_order: 3 },
	{ id: 9, title: "CostPilot", category: "Systems & Full Stack", date: "November, 2025", subtitle: "Local-First Cross-Platform Personal Finance Application", description: "A local-first personal-finance app for web and Android with reusable budgets, alerts, custom categories, exports, spending analytics, and calendar views. Its offline backup system supports scheduling, deduplication, conflict detection, and merge-on-restore without external sync.", image_url: "/images/costpilot.gif", repo_link: "https://github.com/excellencior/cost-pilot", deployed_at: null, tags: ["React 19", "TypeScript", "Vite", "Capacitor 8", "Exports", "Local-First"], sort_order: 4 },
	{ id: 8, title: "Screen Arxiv", category: "Systems & Full Stack", date: "February, 2026", subtitle: "Dual-Platform Media Consumption & Screen-Time Awareness", description: "A web and Android media tracker for watch status, episode progress, release schedules, and viewing analytics. It integrates TMDB search and metadata with portable JSON backup, layered navigation, gestures, and adaptive theming.", image_url: "/images/screenarxiv.gif", repo_link: "https://github.com/excellencior/screen-arxiv", deployed_at: "excellencior.github.io/screen-arxiv/#/", tags: ["React 19", "React Native 0.84", "TypeScript", "TMDB API", "Analytics"], sort_order: 5 },
	{ id: 5, title: "Academic & Personal Portfolio", category: "Systems & Full Stack", date: "July, 2024", subtitle: "Academic Researcher Portfolio & Publication Showcase", description: "A responsive academic portfolio showcasing research publications, engineering systems, coursework, and life milestones. Features BibTeX citation copying, dark/light theme switching, interactive timeline, and PDF viewer.", image_url: "/images/portfolio.jpg", repo_link: "https://github.com/excellencior/Portfolio", deployed_at: "abturjo.onrender.com", tags: ["React", "Material UI", "Express", "Vite", "Responsive Design"], sort_order: 8 },
	{ id: 4, title: "Concurrent Football Management System", category: "Systems & Full Stack", date: "December, 2022", subtitle: "Multi-threaded Client-Server Club Management Engine [BUET L1/T2]", description: "High-concurrency sports club and player management system built with JavaFX and multithreading networking. Implemented custom client-server socket protocol handling concurrent auction bidding, inter-thread resource sharing solving the Producer-Consumer problem, and remote persistence.", image_url: "/images/football-management-system.jpg", repo_link: "https://github.com/excellencior/Football-Player-Management-System", deployed_at: "", tags: ["Java", "JavaFX", "Multithreading", "Socket Networking", "Concurrency"], sort_order: 9 },
	{ id: 3, title: "Catch the Egg - 2D Physics Game", category: "Foundations", date: "November, 2021", subtitle: "Real-Time Interactive 2D Game in C++ & OpenGL [BUET L1/T1]", description: "A 2D arcade physics game implemented in modern C++ using OpenGL (iGraphics). Features customized velocity vectors, airflow turbulence simulation, sound synthesis, texture rasterization, and frame-rate independent rendering.", image_url: "https://github.com/excellencior/Catch-the-Egg/blob/master/Catch_the_egg_Project_SS/combined.png?raw=true", repo_link: "https://github.com/excellencior/Catch-the-Egg/tree/master", deployed_at: "", tags: ["C++", "OpenGL", "Game Physics", "Computer Graphics"], sort_order: 10 },
	{ id: 2, title: "Responsive Weather Intelligence Web App", category: "Foundations", date: "August, 2020", subtitle: "Dynamic Meteorologic Dashboard with OpenWeatherMap API", description: "Responsive weather application that queries real-time meteorological metrics, 5-day predictive forecasts, and geo-coordinates worldwide via OpenWeatherMap REST API.", image_url: "https://github.com/excellencior/Weather-Web-app/raw/master/Webpage%20DemoSS.png", repo_link: "https://github.com/excellencior/Weather-Web-app", deployed_at: "excellencior.github.io/Weather-Web-app/", tags: ["JavaScript", "HTML5", "CSS3", "REST API"], sort_order: 11 },
	{ id: 1, title: "Mathematical Expression Calculator", category: "Foundations", date: "October, 2021", subtitle: "Interactive Browser Calculation Engine", description: "Web calculator supporting chained arithmetic operators, keyboard events, and dynamic DOM rendering.", image_url: "https://github.com/excellencior/Calculator---1/raw/main/Calculator_Project_Page_SS.png", repo_link: "https://github.com/excellencior/Calculator---1", deployed_at: "https://excellencior.github.io/Calculator---1/index.html", tags: ["JavaScript", "HTML5", "CSS3"], sort_order: 12 },
];

// Life Updates
const historicalLifeUpdates = [
	{ id: 11, date: "Feb 2026", title: "Built Screen Arxiv", description: "Created a dual-platform media tracking app (React web + React Native Android) with TMDB integration, library analytics, and gesture-based navigation", sort_order: 1 },
	{ id: 10, date: "Nov 2025", title: "Built CostPilot", description: "Developed a local-first cross-platform personal finance app (Web + Android) with budget planning, spending analytics, and an offline-capable rolling backup system", sort_order: 2 },
	{ id: 9, date: "Nov 2025 - Present", title: "AI Research on Model Compression", description: "Currently researching the impact of model compression on the trustworthiness of AI models", sort_order: 3 },
	{ id: 8, date: "Apr 2025", specific_date: "April 4, 2025", title: "Joined Therap BD Ltd.", description: "Started working as an Associate Software Engineer", sort_order: 4 },
	{ id: 7, date: "Mar 2025", specific_date: "March 25, 2025", title: "Thesis Defense Completed", description: "Successfully defended thesis on 'Detection of Dengue Breeding Sites in Large-scale Landscapes Plagued by Unplanned Urban Development from Aerial Imagery and Remote Sensing with Deep Learning' under Dr. Anindya Iqbal's guidance, with thesis partner Sushmita Paul. Currently in review", sort_order: 5 },
	{ id: 6, date: "Nov 2021", specific_date: "November 13, 2021", title: "Returned to Campus", description: "Resumed attending classes at BUET after pandemic lockdown", sort_order: 6 },
	{ id: 5, date: "Mar 2020", specific_date: "March 18, 2020", title: "COVID-19 Lockdown", description: "Classes suspended and students sent home due to coronavirus outbreak", sort_order: 7 },
	{ id: 4, date: "Feb 2020", specific_date: "February 22, 2020", title: "CSE Journey Began", description: "Started Computer Science and Engineering classes at BUET", sort_order: 8 },
	{ id: 3, date: "Oct 2019", specific_date: "October 25, 2019", title: "Admitted to BUET", description: "Secured admission to Bangladesh University of Engineering and Technology with position 191", sort_order: 9 },
	{ id: 2, date: "Oct 2019", specific_date: "October 14, 2019", title: "BUET Admission Test", description: "Appeared for the admission test at my dream institution", sort_order: 10 },
	{ id: 1, date: "Jul 2019", specific_date: "July 17, 2019", title: "HSC Results Published", description: "Achieved GPA 5.00 and earned eligibility for BUET admission test", sort_order: 11 },
];

const lifeUpdates = [
	{ id: 15, date: "Ongoing", title: "Diagnosing SLMs under Incremental Observations", description: "Conducting a diagnostic study of how small language models sustain reasoning as observations accumulate across long-horizon, multi-turn interactions.", sort_order: 1 },
	{ id: 14, date: "Ongoing", title: "Building Its Eze", description: "Developing an interactive AI and deep-learning blog that combines illustrated explanations, paper references, mathematical notation, inline visualizations, and 3D architecture explorations.", sort_order: 2 },
	{ id: 13, date: "Aug 2026", title: "Completed Scholman", description: "Built an interactive platform for prospective PhD applicants to track and manage the demanding application process. It uses scraped CSRankings data as its foundation, with application-management tools built on top.", sort_order: 3 },
	{ id: 12, date: "Apr 2026", specific_date: "April 4, 2026", title: "Promoted to Software Engineer", description: "Marked one year at Therap (BD) Ltd. and was promoted from Associate Software Engineer to Software Engineer.", sort_order: 4 },
	...historicalLifeUpdates.map((item) => ({ ...item, sort_order: item.sort_order + 4 })),
];

// Academics
const academics = [
	{ id: 5, year: "2020 - 2025", level: "Undergraduate", class: "Computer Science and Engineering", institution: "Bangladesh University of Engineering & Technology", degree: "B.Sc. in Computer Science and Engineering", thesis: "Detection of Dengue Breeding Sites in Large-scale Landscapes Plagued by Unplanned Urban Development from Aerial Imagery and Remote Sensing with Deep Learning", advisor: "Dr. Anindya Iqbal", thesis_partner: "Sushmita Paul", rank: "Merit Position 191 in BUET Admission Test", coursework: ["Machine Learning", "Computer Vision", "Algorithms", "Data Structures", "Distributed Systems", "Computer Networks", "Operating Systems"], location_place: "Dhaka, Bangladesh", location_link: "https://maps.app.goo.gl/16PysViis2NH6AE28", sort_order: 1 },
	{ id: 4, year: "2017 - 2019", level: "Higher Secondary", class: "Class-11 to Class-12", institution: "Shahid Syed Nazrul Islam College, Mymensingh", location_place: "Mymensingh, Bangladesh", location_link: "https://maps.app.goo.gl/jvsBt8ZJEAcosFab8", sort_order: 2 },
	{ id: 3, year: "2012 - 2017", level: "Secondary", class: "Class-6 to Class-10", institution: "Anjuman Adarsha Govt. High School, Netrakona", location_place: "Netrokona, Bangladesh", location_link: "https://maps.app.goo.gl/CM8thbB61xsD6yuE6", sort_order: 3 },
	{ id: 2, year: "2009 - 2011", level: "Primary", class: "Class-2 to Class-5", institution: "Anjuman Adarsha Govt. High School adj to Primary School", location_place: "Netrokona, Bangladesh", location_link: "https://maps.app.goo.gl/CM8thbB61xsD6yuE6", sort_order: 4 },
	{ id: 1, year: "2005 - 2008", level: "Pre-School", class: "Play & Nursery - Class-2", institution: "Mukti Precadet School", location_place: "Kalmakanda, Netrokona, Bangladesh", location_link: "https://maps.app.goo.gl/7DYMrU5jLdcq9wSy6", sort_order: 5 },
];

// Bio
const bio = {
	id: 1,
	name: "Apurbo Banik Turjo",
	profile_photo: "/images/profile.jpeg",
	role_title: "Software Engineer at Therap (BD) Ltd.",
	education: "B.Sc. in Computer Science and Engineering, BUET (April 2025)",
	research_interests: [
		"Small Language Models (SLMs)",
		"Long-Horizon Context & Reasoning",
		"Computer Vision & Remote Sensing",
		"Optimistic RAG & AI Systems",
	],
	description: `<p style="text-align: justify; margin: 0;">I grew up fascinated by the technological feats of the world and wondered how it all comes together under the hood. That fascination made me a devotee of computer science, and my alma mater <b>BUET</b> gave me the opportunity to learn and grow in a knowledge-driven environment.<br/><br/>My undergraduate thesis focused on building a two-stage deep learning pipeline for <b>detecting dengue breeding sites from aerial imagery and remote sensing</b> in densely populated cities like Dhaka, currently <b>under review for publication</b>. Recently, I have been working on a diagnostic study investigating how <b>Small Language Models (SLMs)</b> utilize compounding information in long-horizon multi-turn conversations, addressing lost-in-the-middle degradation, recency bias, and exploring whether structured cueing mechanisms can improve sustained reasoning.<br/><br/>On the industry side, I joined <b>Therap BD Ltd.</b> as a software engineer to taste the software industry and collaborate on bleeding-edge AI systems. Here, I contributed to building an enterprise AI hub supporting configurable knowledge retrieval (Optimistic RAG), long-horizon chat with memory persistence and sandboxing, as well as an AI-powered trend analysis system on real-world longitudinal healthcare metrics.<br/><br/><em>Curiosity is what started all of this, and it hasn't stopped being the reason I keep learning something new every day.</em></p>`,
};

async function seedTable(name, rows) {
	console.log(`Seeding ${name}...`);
	const items = Array.isArray(rows) ? rows : [rows];
	for (const row of items) {
		const { error } = await supabaseUpsert(name, [row]);
		if (error) {
			console.error(`  Error in ${name}:`, error);
			return false;
		}
	}
	console.log(`  Inserted ${items.length} ${name}`);
	return true;
}

async function seed() {
	if (!await seedTable("publications", publications)) return;
	if (!await seedTable("projects", projects)) return;
	if (!await seedTable("life_updates", lifeUpdates)) return;
	if (!await seedTable("academics", academics)) return;
	if (!await seedTable("bio", [bio])) return;
	console.log("\nSeed complete!");
}

seed();
