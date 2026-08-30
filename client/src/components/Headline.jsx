import { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CheckIcon from "@mui/icons-material/Check";
import DescriptionIcon from "@mui/icons-material/Description";
import { Tooltip } from "@mui/material";

const Headline = () => {
	const [copied, setCopied] = useState(false);

	const handleCopyEmail = () => {
		navigator.clipboard.writeText("turjob44@gmail.com");
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<header id="headline">
			<div className="headline-quote">
				<span className="quote-text">"We know what we are, but know not what we may be."</span>
				<span className="quote-author">- William Shakespeare</span>
			</div>
			<h1>Apurbo Banik Turjo</h1>
			<div className="headline-subtitle">
				Software Engineer at Therap (BD) Ltd.<br />
				B.Sc. in CSE, BUET
			</div>

			<div className="headline-links">
				<div className="headline-links-row">
					<Tooltip title={copied ? "Email Copied!" : "Click to copy email: turjob44@gmail.com"}>
						<button type="button" onClick={handleCopyEmail}>
							{copied ? <CheckIcon sx={{ fontSize: 14, color: "green" }} /> : <EmailIcon sx={{ fontSize: 14 }} />}
							<span className="email-text-full">turjob44@gmail.com</span>
							<span className="email-text-short">Email</span>
						</button>
					</Tooltip>
					<span className="link-dot">•</span>
					<a href="https://github.com/excellencior" target="_blank" rel="noopener noreferrer">
						<GitHubIcon sx={{ fontSize: 14 }} />
						<span>GitHub</span>
					</a>
					<span className="link-dot">•</span>
					<a href="https://www.linkedin.com/in/apurbo-banik-turjo-86b5b3328" target="_blank" rel="noopener noreferrer">
						<LinkedInIcon sx={{ fontSize: 14, color: "#0A66C2" }} />
						<span>LinkedIn</span>
					</a>
					<span className="link-dot">•</span>
					<a href="/cv.pdf" download="Apurbo_Banik_Turjo_CV.pdf">
						<DescriptionIcon sx={{ fontSize: 14 }} />
						<span>CV</span>
					</a>
				</div>
			</div>
		</header>
	);
};

export default Headline;
