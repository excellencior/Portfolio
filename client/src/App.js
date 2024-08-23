import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";

import axios from "axios";

import mytheme from "./theme";

import Projects from "./pages/projects";
import Bio from "./pages/bio";
import CV from "./pages/cv";
import Academics from "./pages/academics";
import Photography from "./pages/photography";
import Mail from "./pages/mail";

import Sidepane from "./components/sidepane";
import Toppane from "./components/toppane";

const addTopPane = (title, Component) => {
	return (props) => (
		<>
			<div className="page-content">
				<Toppane title={title} />
				<Component {...props} />
			</div>
		</>
	);
};

function App() {
	// Set the base URL
	axios.defaults.baseURL = "http://localhost:4000";

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
				<Router>
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
				</Router>
			</div>
		</ThemeProvider>
	);
}

export default App;
