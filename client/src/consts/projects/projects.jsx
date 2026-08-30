const projects = [
    {
        id: 9,
        title: 'CostPilot',
        category: 'Systems & Full Stack',
        date: 'November, 2025',
        subtitle: 'Local-First Cross-Platform Personal Finance Application',
        description: 'A local-first cross-platform finance app (Web + Android) offering typically premium features at zero cost: reusable budget plans with threshold alerts, custom category taxonomy, branded document/CSV data exports, calendar heatmap, and dual-mode spending analytics; deployed from a single React/TypeScript codebase to both Vercel and a signed Android APK via Capacitor. Features an offline-capable rolling backup system with scheduled auto-backups, missed-window catch-up on app resume, same-day overwrite conflict detection, content-hash deduplication to skip redundant writes, and a merge-on-restore flow that intelligently reconciles backup data with live device state without any external sync dependency.',
        imageurl: '/images/costpilot.gif',
        repoLink: 'https://github.com/excellencior/cost-pilot',
        deployedAt: 'cost-pilot-xi.vercel.app',
        tags: ['React 19', 'TypeScript', 'Vite', 'Capacitor 8', 'Exports', 'Local-First']
    },
    {
        id: 8,
        title: 'Screen Arxiv',
        category: 'Systems & Full Stack',
        date: 'February, 2026',
        subtitle: 'Dual-Platform Media Consumption & Screen-Time Awareness',
        description: 'A dual-platform media consumption awareness app (React/Vite web + React Native Android) designed to surface how much screen time is spent and on what; features status-based tracking (Watched, Watching, Waitlist), granular per-episode TV progress with bulk actions, upcoming episode/movie release schedules, and a library analytics engine with decade distribution and genre breakdowns to quantify consumption patterns. Integrated TMDB API with real-time debounced search and auto-fetched metadata; designed a layered modal navigation system; implemented gesture-based swipeable tabs, JSON backup/restore for full library portability, and adaptive theming.',
        imageurl: '/images/screenarxiv.gif',
        repoLink: 'https://github.com/excellencior/screen-arxiv',
        deployedAt: 'excellencior.github.io/screen-arxiv/#/',
        tags: ['React 19', 'React Native 0.84', 'TypeScript', 'TMDB API', 'Analytics']
    },
    {
        id: 7,
        title: 'Dengue Breeding Site Detection via Drone Remote Sensing',
        category: 'AI & Machine Learning',
        date: 'April, 2025',
        subtitle: 'Two-Stage Vision Pipeline on High-Density Aerial Orthophotos',
        description: 'Implemented a novel two-stage deep learning pipeline for early detection of dengue mosquito breeding sites in dense urban regions where manual inspections are costly and unscalable. The system first segments individual buildings from aerial imagery (SegGPT), then detects potential dengue breeding micro-objects (YOLOv9/v11), and finally spatially combines both outputs via an Oriented Bounding Box (OBB) merging algorithm. Tested on orthophotos from two dengue-prone districts in Dhaka, the method achieved an 83.6% balanced accuracy while reducing manual inspection effort by 35%.',
        imageurl: '/images/orthophoto_r83_preview.png',
        repoLink: '',
        deployedAt: '',
        tags: ['Computer Vision', 'YOLOv11', 'SegGPT', 'OBB Merging', 'Remote Sensing', 'PyTorch']
    },
    {
        id: 6,
        title: 'Predictive Diagnosis System via Pretrained BioBERT',
        category: 'AI & Machine Learning',
        date: 'January, 2025',
        subtitle: 'Clinical Differential Diagnostic Profiling with Biomedical NLP',
        description: 'Built personalized predictive diagnostic profiles based on medical history, demographic priors, and real-time observed symptoms. Fine-tuned the pretrained BioBERT biomedical model on clinical symptom interaction datasets (ddxplus) to generate ranked differential diagnoses with calibrated probability distributions.',
        imageurl: '/images/machine-learning.jpg',
        repoLink: 'https://github.com/excellencior/ML-Project---bioBERT',
        tags: ['Machine Learning', 'BioBERT', 'Clinical NLP', 'Fine-Tuning', 'PyTorch']
    },
    {
        id: 5,
        title: 'Academic & Personal Portfolio',
        category: 'Systems & Full Stack',
        date: 'July, 2024',
        subtitle: 'Academic Researcher Portfolio & Publication Showcase',
        description: 'A responsive academic portfolio showcasing research publications, engineering systems, coursework, and life milestones. Features BibTeX citation copying, dark/light theme switching, interactive timeline, and PDF viewer.',
        imageurl: '/images/portfolio.jpg',
        repoLink: 'https://github.com/excellencior/Portfolio',
        deployedAt: 'abturjo.onrender.com',
        tags: ['React', 'Material UI', 'Express', 'Vite', 'Responsive Design']
    },
    {
        id: 4,
        title: 'Concurrent Football Management System',
        category: 'Systems & Full Stack',
        date: 'December, 2022',
        subtitle: 'Multi-threaded Client-Server Club Management Engine [BUET L1/T2]',
        description: 'High-concurrency sports club and player management system built with JavaFX and multithreading networking. Implemented custom client-server socket protocol handling concurrent auction bidding, inter-thread resource sharing solving the Producer-Consumer problem, and remote persistence.',
        imageurl: '/images/football-management-system.jpg',
        repoLink: 'https://github.com/excellencior/Football-Player-Management-System',
        deployedAt: '',
        tags: ['Java', 'JavaFX', 'Multithreading', 'Socket Networking', 'Concurrency']
    },
    {
        id: 3,
        title: 'Catch the Egg - 2D Physics Game',
        category: 'Foundations',
        date: 'November, 2021',
        subtitle: 'Real-Time Interactive 2D Game in C++ & OpenGL [BUET L1/T1]',
        description: 'A 2D arcade physics game implemented in modern C++ using OpenGL (iGraphics). Features customized velocity vectors, airflow turbulence simulation, sound synthesis, texture rasterization, and frame-rate independent rendering.',
        imageurl: 'https://github.com/excellencior/Catch-the-Egg/blob/master/Catch_the_egg_Project_SS/combined.png?raw=true',
        repoLink: 'https://github.com/excellencior/Catch-the-Egg/tree/master',
        deployedAt: '',
        tags: ['C++', 'OpenGL', 'Game Physics', 'Computer Graphics']
    },
    {
        id: 2,
        title: 'Responsive Weather Intelligence Web App',
        category: 'Foundations',
        date: 'August, 2020',
        subtitle: 'Dynamic Meteorologic Dashboard with OpenWeatherMap API',
        description: 'Responsive weather application that queries real-time meteorological metrics, 5-day predictive forecasts, and geo-coordinates worldwide via OpenWeatherMap REST API.',
        imageurl: 'https://github.com/excellencior/Weather-Web-app/raw/master/Webpage%20DemoSS.png',
        repoLink: 'https://github.com/excellencior/Weather-Web-app',
        deployedAt: 'excellencior.github.io/Weather-Web-app/',
        tags: ['JavaScript', 'HTML5', 'CSS3', 'REST API']
    },
    {
        id: 1,
        title: 'Mathematical Expression Calculator',
        category: 'Foundations',
        date: 'October, 2021',
        subtitle: 'Interactive Browser Calculation Engine',
        description: 'Web calculator supporting chained arithmetic operators, keyboard events, and dynamic DOM rendering.',
        imageurl: 'https://github.com/excellencior/Calculator---1/raw/main/Calculator_Project_Page_SS.png',
        repoLink: 'https://github.com/excellencior/Calculator---1',
        deployedAt: 'https://excellencior.github.io/Calculator---1/index.html',
        tags: ['JavaScript', 'HTML5', 'CSS3']
    }
];

export default projects;