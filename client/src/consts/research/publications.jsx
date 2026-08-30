const publications = [
	{
		id: "dengue-detection-aerial",
		title: "Detection of Dengue Breeding Sites in Large-scale Landscapes Plagued by Unplanned Urban Development from Aerial Imagery and Remote Sensing with Deep Learning",
		authors: [
			{ name: "Apurbo Banik Turjo", isSelf: true },
			{ name: "Sushmita Paul", isSelf: false },
			{ name: "Dr. Anindya Iqbal", isSelf: false }
		],
		venue: "Under Review / B.Sc. Undergraduate Thesis",
		venueDetails: "Department of Computer Science and Engineering, Bangladesh University of Engineering and Technology (BUET)",
		year: "2025",
		status: "Under Review",
		statusType: "under_review",
		selected: true,
		category: "Computer Vision & Remote Sensing",
		image: "/images/orthophoto_r83_preview.png",
		abstract: "Manual inspection of dengue mosquito breeding grounds in dense, unplanned urban metropolises is notoriously labor-intensive, slow, and unscalable. This work introduces a novel two-stage deep learning pipeline combining fine-tuned vision segmentation (SegGPT) and object detection models (YOLOv9/v11) coupled with an Oriented Bounding Box (OBB) spatial merging algorithm on high-resolution drone orthophotos. Evaluating on dense districts in Dhaka, our system achieves an 83.6% balanced accuracy and reduces physical inspection ground-effort by 35% compared to conventional single-stage baselines.",
		highlights: [
			"Two-stage pipeline: Building footprint segmentation + Micro breeding object detection + OBB spatial merging",
			"Achieved 83.6% balanced accuracy on high-density unplanned urban environments",
			"35% reduction in physical health inspector field traversal effort"
		],
		tags: ["Computer Vision", "Remote Sensing", "YOLOv11", "SegGPT", "OBB Merging", "Urban Health AI"],
		links: {
			code: "",
			project: "/projects",
			paper: "",
		},
		bibtex: `@article{turjo2025dengue,
  title={Detection of Dengue Breeding Sites in Large-scale Landscapes Plagued by Unplanned Urban Development from Aerial Imagery and Remote Sensing with Deep Learning},
  author={Turjo, Apurbo Banik and Paul, Sushmita and Iqbal, Anindya},
  journal={Under Review (B.Sc. Thesis, Department of Computer Science and Engineering, BUET)},
  year={2025}
}`
	},
	{
		id: "slm-long-horizon-context",
		title: "A Diagnostic Study on Long-Horizon Compounding Context Utilization in Small Language Models (SLMs)",
		authors: [
			{ name: "Apurbo Banik Turjo", isSelf: true }
		],
		venue: "Research in Progress",
		venueDetails: "Independent Research & Diagnostic Evaluation",
		year: "2026",
		status: "In Progress",
		statusType: "in_progress",
		selected: true,
		category: "Natural Language Processing & Small Language Models",
		image: "/images/machine-learning.jpg",
		abstract: "As Small Language Models (SLMs, <= 7B parameters) become pervasive for edge deployment and privacy-preserving assistants, their ability to sustain coherent reasoning over compounding context horizons degrades sharply. This study investigates the manifestation of 'Lost-in-the-Middle', recency bias, and depth ceilings in SLMs during multi-turn long-horizon interactions. We propose structured cueing mechanisms and selective attention prompts to assess whether lightweight intermediate memory anchors can alleviate attention dispersion without increasing parameter footprint.",
		highlights: [
			"Benchmarking 1B-7B parameter SLMs on compound multi-turn retrieval and reasoning",
			"Quantifying attention degradation, recency bias, and depth ceiling failure modes",
			"Evaluating lightweight cueing and structured memory injection strategies"
		],
		tags: ["Small Language Models", "Long-Horizon Reasoning", "Lost in the Middle", "Context Degradation", "Attention Cueing"],
		links: {
			code: "",
			project: "",
		},
		bibtex: `@article{turjo2026slmcontext,
  title={A Diagnostic Study on Long-Horizon Compounding Context Utilization in Small Language Models (SLMs)},
  author={Turjo, Apurbo Banik},
  journal={Work in Progress},
  year={2026}
}`
	},
	{
		id: "ai-systems-optimistic-rag",
		title: "Architecture and Memory Persistence for Scalable Multi-Horizon Enterprise AI Systems",
		authors: [
			{ name: "Apurbo Banik Turjo", isSelf: true }
		],
		venue: "Engineering Whitepaper / Industry System Design",
		venueDetails: "Therap (BD) Ltd. AI Systems Group",
		year: "2025",
		status: "Applied Research / System",
		statusType: "system",
		selected: true,
		category: "AI Systems Engineering",
		image: "/images/costpilot.gif",
		abstract: "Designing enterprise-grade collaborative AI hubs requires handling heterogeneous user workflows across technical and non-technical staff while guaranteeing high retrieval accuracy, isolated sandboxing, and persistent long-turn session memories. We detail the design and implementation of an 'Optimistic RAG' knowledge retrieval pipeline and sandboxed execution environment developed at Therap, along with an AI-driven trend analysis pipeline for personal healthcare indicators.",
		highlights: [
			"Optimistic RAG knowledge-base pipeline with dynamic confidence filtering",
			"Sandboxed session memory persistence for multi-turn cross-department conversations",
			"AI trend analysis system for Longitudinal Individual Health Data"
		],
		tags: ["Optimistic RAG", "Memory Persistence", "AI Systems", "Healthcare AI", "Enterprise Architecture"],
		links: {
			code: "",
			project: "/projects",
		},
		bibtex: `@misc{turjo2025optimisticrag,
  title={Architecture and Memory Persistence for Scalable Multi-Horizon Enterprise AI Systems},
  author={Turjo, Apurbo Banik},
  howpublished={Therap AI Systems Technical Report},
  year={2025}
}`
	},
	{
		id: "biobert-predictive-diagnosis",
		title: "Predictive Clinical Diagnostic Profile Estimation via Pretrained BioBERT on ddxplus",
		authors: [
			{ name: "Apurbo Banik Turjo", isSelf: true }
		],
		venue: "Machine Learning Prototype",
		venueDetails: "BUET Machine Learning Research Lab",
		year: "2025",
		status: "Prototype",
		statusType: "system",
		selected: false,
		category: "Applied Machine Learning & Healthcare",
		image: "/images/machine-learning.jpg",
		abstract: "Personalized predictive diagnostic profiling system that synthesizes patient medical history, demographic priors (age, sex), and real-time observed symptoms. Fine-tuned the biomedical language representation model BioBERT on preprocessed clinical symptom-disease interaction sets (ddxplus), outputting calibrated differential diagnostic probabilities to assist clinical triaging.",
		highlights: [
			"Fine-tuned domain-specific BioBERT on structured clinical symptom matrices",
			"Probabilistic multi-label classification output for differential diagnosis"
		],
		tags: ["BioBERT", "Healthcare AI", "Clinical NLP", "Fine-Tuning", "Probabilistic Diagnosis"],
		links: {
			code: "https://github.com/excellencior/ML-Project---bioBERT",
			project: "/projects",
		},
		bibtex: `@misc{turjo2025biobert,
  title={Predictive Clinical Diagnostic Profile Estimation via Pretrained BioBERT on ddxplus},
  author={Turjo, Apurbo Banik},
  howpublished={GitHub Repository: ML-Project---bioBERT},
  year={2025}
}`
	}
];

export default publications;
