import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

// myworks: Projects, Academics, Photography (with icons, to)
const myworks = [
	{
		title: "Projects",
		icon: "",
		to: "/projects",
	},
	{
		title: "Academics",
		icon: "",
		to: "/academics",
	},
	{
		title: "Photography",
		icon: "",
		to: "/photography",
	},
];

// Bio, CV: title, icon, to
const about_me = [
	{
		title: "Bio",
		icon: "",
		to: "/",
	},
	{
		title: "CV",
		icon: "",
		to: "/cv",
	},
];

// Contact : Facebook, Gmail, Github (with icons and links)
const contact = [
	{
		title: "Mail",
		icon: <EmailIcon sx={{ color: "darkgreen"}} />,
		link: "/mail",
	},
	{
		title: "Facebook",
		icon: <FacebookIcon sx={{ color: "blue"}} />,
		link: "https://www.facebook.com/apurbobanik.turjo/",
	},
	{
		title: "Github",
		icon: <GitHubIcon sx={{ color: "black"}} />,
		link: "https://github.com/excellencior",
	},
];

const Sidepane = { myworks, about_me, contact };
export default Sidepane;
