import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

// myworks: Projects, Research, Academics, Photography
const myworks = [
	{
		title: "Projects",
		to: "/projects",
	},
	{
		title: "Research",
		to: "/research",
	},
	{
		title: "Academics",
		to: "/academics",
	},
	{
		title: "Photography",
		to: "/photography",
	},
];

// about_me: Bio, Timeline
const about_me = [
	{
		title: "Bio",
		to: "/",
	},
	{
		title: "Timeline",
		to: "/updates",
	},
];

// Contact : Mail, GitHub, LinkedIn
const contact = [
	{
		title: "Mail",
		icon: <EmailIcon sx={{ color: "darkgreen" }} />,
		link: "/mail",
	},
	{
		title: "Github",
		icon: <GitHubIcon sx={{ color: "black" }} />,
		link: "https://github.com/excellencior",
		isExternal: true,
	},
	{
		title: "LinkedIn",
		icon: <LinkedInIcon sx={{ color: "#0A66C2" }} />,
		link: "https://www.linkedin.com/in/abturjo/",
		isExternal: true,
	},
];

const Sidepane = { myworks, about_me, contact };
export default Sidepane;
