import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import axios from "axios";
import mytheme from "./theme.jsx";

import Projects from "./pages/projects.jsx";
import Bio from "./pages/bio.jsx";
import CV from "./pages/cv.jsx";
import Academics from "./pages/academics.jsx";
import Photography from "./pages/photography.jsx";
import Mail from "./pages/mail.jsx";

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
			title: "Projects",
			contents: addTopPane("Projects", Projects),
			to: "/projects",
		},
		{
			title: "Bio",
			contents: addTopPane("Bio", Bio),
			to: "/",
		},
		{
			title: "CV",
			contents: addTopPane("CV", CV),
			to: "/cv",
		},
		{
			title: "Academics",
			contents: addTopPane("Academics", Academics),
			to: "/academics",
		},
		{
			title: "Photography",
			contents: addTopPane("Photography", Photography),
			to: "/photography",
		},
		{
			title: "Mail",
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
								key={page.title}
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
