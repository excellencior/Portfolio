import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import mytheme from "./theme.jsx";

import Projects from "./pages/projects_page.jsx";
import Bio from "./pages/bio_page.jsx";
import LifeUpdate from "./pages/life_updates_page.jsx";
import CV from "./pages/cv_page.jsx";
import Academics from "./pages/academics_page.jsx";
import Photography from "./pages/photography_page.jsx";
import Mail from "./pages/mail_page.jsx";

import Sidepane from "./components/sidepane.jsx";
import Toppane from "./components/toppane.jsx";
import { Container } from "@mui/material";

const addTopPane = (title, Component) => {
	return (props) => (
		<>
			<Container className="page-content">
				<Toppane title={title} />
				<Component {...props} />
			</Container>
		</>
	);
};

const App = () => {
	// Set the base URL
	axios.defaults.baseURL = import.meta.env.VITE_API_URL;

	const pages = [
		{
			contents: addTopPane("Projects", Projects),
			to: "/projects",
		},
		{
			contents: addTopPane("Bio", Bio),
			to: "/",
		},
		{
			contents: addTopPane("Life Update", LifeUpdate),
			to: "/updates",
		},
		{
			contents: addTopPane("Resume", CV),
			to: "/cv",
		},
		{
			contents: addTopPane("Academics", Academics),
			to: "/academics",
		},
		{
			contents: addTopPane("Photography", Photography),
			to: "/photography",
		},
		{
			contents: addTopPane("Mail", Mail),
			to: "/mail",
		},
	];

	return (
		<ThemeProvider theme={mytheme}>
			<div className="App content-container">
					<Sidepane className="sidepane" />
					<Routes>
						{pages.map((page) => (
							<Route
								path={page.to}
								element={<page.contents />}
							/>
						))}
					</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
