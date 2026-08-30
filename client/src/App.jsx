import { useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import mytheme from "./theme.jsx";

import Headline from "./components/Headline.jsx";
import HeaderMenu from "./components/HeaderMenu.jsx";
import Bio from "./pages/bio_page.jsx";
import Research from "./pages/research_page.jsx";
import Projects from "./pages/projects_page.jsx";
import Academics from "./pages/academics_page.jsx";
import Photography from "./pages/photography_page.jsx";
import LifeUpdate from "./pages/life_updates_page.jsx";
import Mail from "./pages/mail_page.jsx";

const ScrollToTop = () => {
	const { pathname } = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return null;
};

const App = () => {
	const location = useLocation();
	axios.defaults.baseURL = import.meta.env.VITE_API_URL || "";

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<ThemeProvider theme={mytheme}>
			<div className="App">
				<ScrollToTop />
				<div className="layout-wrapper">
					<aside className="sidebar-container">
						<Headline />
						<HeaderMenu />
					</aside>
					<div className="main-wrapper">
						<main id="content" key={location.pathname} className="page-transition">
							<Routes location={location}>
								<Route path="/" element={<Bio />} />
								<Route path="/research" element={<Research />} />
								<Route path="/projects" element={<Projects />} />
								<Route path="/academics" element={<Academics />} />
								<Route path="/updates" element={<LifeUpdate />} />
								<Route path="/photography" element={<Photography />} />
								<Route path="/mail" element={<Mail />} />
								<Route path="*" element={<Navigate to="/" replace />} />
							</Routes>
						</main>
						<footer>
							<div>
								© {new Date().getFullYear()} Apurbo Banik Turjo •{" "}
								<button
									type="button"
									onClick={scrollToTop}
									style={{ background: "none", border: "none", color: "var(--primary-color)", cursor: "pointer", textDecoration: "underline", font: "inherit" }}
								>
									Back to top ↑
								</button>
							</div>
						</footer>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default App;
