const projects = [
    {
        id: 9,
        title: 'CostPilot',
        date: 'November, 2025',
        description: 'A local-first cross-platform finance app (Web + Android) offering typically premium features at zero cost: reusable budget plans with threshold alerts, custom category taxonomy, branded PDF/CSV data exports, calendar heatmap, and dual-mode spending analytics; deployed from a single React/TypeScript codebase to both Vercel and a signed Android APK via Capacitor. Features an offline-capable rolling backup system with scheduled auto-backups, missed-window catch-up on app resume, same-day overwrite conflict detection, content-hash deduplication to skip redundant writes, and a merge-on-restore flow that intelligently reconciles backup data with live device state without any external sync dependency.',
        imageurl: '/images/costpilot.gif',
        repoLink: 'https://github.com/excellencior/cost-pilot',
        deployedAt: 'cost-pilot-xi.vercel.app',
        tags: ['React 19', 'TypeScript', 'Vite', 'Capacitor 8', 'jsPDF']
    },
    {
        id: 8,
        title: 'Screen Arxiv',
        date: 'February, 2026',
        description: 'A dual-platform media consumption awareness app (React/Vite web + React Native Android) designed to surface how much screen time is spent and on what; features status-based tracking (Watched, Watching, Waitlist), granular per-episode TV progress with bulk actions, upcoming episode/movie release schedules, and a library analytics engine with decade distribution and genre breakdowns to quantify consumption patterns. Integrated TMDB API with real-time debounced search and auto-fetched metadata (cast carousels, trailers, release dates); designed a layered modal navigation system for hierarchical content browsing; implemented gesture-based swipeable tabs, JSON backup/restore for full library portability, and adaptive theming across both platforms from shared business logic.',
        imageurl: '/images/screenarxiv.gif',
        repoLink: 'https://github.com/excellencior/screen-arxiv',
        deployedAt: 'excellencior.github.io/screen-arxiv/#/',
        tags: ['React 19', 'React Native 0.84', 'TypeScript', 'TMDB API']
    },
    {
        id: 7,
        title: 'Detection of Dengue Breeding Sites in Large‑scale Landscapes Plagued by Unplanned Urban Development from Aerial Imagery and Remote Sensing with Deep Learning',
        date: 'April, 2025',
        description: 'This project implements a novel two-stage deep learning pipeline for early detection of dengue breeding sites in dense urban regions where manual inspections are costly and unscalable. The system first segments individual buildings from aerial imagery, then detects potential dengue breeding objects, and finally spatially combines both outputs to enable geo-targeted inspections. Tested on orthophotos from two dengue-prone districts in Dhaka, the method achieved an 83.6% balanced accuracy while reducing manual inspection effort by 35%, outperforming a one-stage baseline approach.',
        imageurl: '/images/orthophoto_r83_preview.png',
        repoLink: '',
        deployedAt: '',
        tags: ['CV', 'YOLOv9-v11', 'SegGPT', 'OBB Merging Algorithm', 'Orthophoto']
    },
    {
        id: 6,
        title: 'Predictive Diagnosis System',
        date: "January, 2025",
        description: 'The system builds personalized predictive diagnostic profiles based on medical history, current symptoms, age, sex, etc. Using the pretrained BioBERT model, fine-tuned on a preprocessed dataset (ddxplus), the system generates a list of possible diagnoses with their respective probabilities.',
        imageurl: '/images/machine-learning.jpg',
        repoLink: 'https://github.com/excellencior/ML-Project---bioBERT',
        tags: ['Machine Learning', 'BioBERT', 'Fine Turning', 'Medical']
    },
    {
        id: 5,
        title: 'Personal Portfolio',
        date: "July, 2024",
        description: 'A personal portfolio website showcasing my projects, skills, and experience. It includes an interactive resume, project gallery, and contact form for potential clients or employers.',
        imageurl: '/images/portfolio.jpg',
        repoLink: 'https://github.com/excellencior/Portfolio',
        deployedAt: 'https://abturjo.onrender.com',
        tags: ['React', 'Express', 'Portfolio']
    },
    {
        id: 4,
        title: 'Football Management System [L1/T2] [BUET]',
        date: "December, 2022",
        description: 'The Football Management System lets you manage teams and players with real-time updates. Built with JavaFX and Java multithreading, it handles multiple user requests, supports inter-thread resource sharing, and follows Java coding conventions. Users can create teams, buy and sell players, and save data in a remote database.',
        imageurl: '/images/football-management-system.jpg',
        repoLink: 'https://github.com/excellencior/Football-Player-Management-System',
        deployedAt: '',
        tags: ['Java', 'JavaFX', 'Multithreading', 'Networking', 'Producer-Consumer-Problem']
    },
    {
        id: 3,
        title: 'Simple Calculator',
        date: "October, 2021",
        description: 'A very simple calculator web-app made only with html, js and css. It was very fun when I started learning and wanted to do something with my newly learned knowledge.',
        imageurl: 'https://github.com/excellencior/Calculator---1/raw/main/Calculator_Project_Page_SS.png',
        repoLink: 'https://github.com/excellencior/Calculator---1',
        deployedAt: 'https://excellencior.github.io/Calculator---1/index.html',
        tags: ['HTML', 'JS', 'CSS']
    },
    {
        id: 2,
        title: 'Catch the Egg [L1/T1] [BUET]',
        date: "November, 2021",
        description: 'Catch the Egg – A 2D game implemented in C++ using OpenGL, featuring real-time physics, airflow effects, sound integration, and adjustable difficulty levels. Learned event handling, texture rendering, and frame-based animation using OpenGL.',
        imageurl: 'https://github.com/excellencior/Catch-the-Egg/blob/master/Catch_the_egg_Project_SS/combined.png?raw=true',
        repoLink: 'https://github.com/excellencior/Catch-the-Egg/tree/master',
        deployedAt: '',
        tags: ['CPP', 'bmp', 'OpenGL']
    },
    {
        id: 1,
        title: 'Weather App',
        date: 'August, 2020',
        description: 'A responsive weather application that provides real-time weather updates and forecasts for any location worldwide. Built with JS & HTML and integrated with the OpenWeatherMap API.',
        imageurl: 'https://github.com/excellencior/Weather-Web-app/raw/master/Webpage%20DemoSS.png',
        repoLink: 'https://github.com/excellencior/Weather-Web-app',
        deployedAt: 'excellencior.github.io/Weather-Web-app/',
        tags: ['HTML', 'JS', 'CSS', 'API']
    }
];

export default projects;