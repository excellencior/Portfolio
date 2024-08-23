import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom"; // Import Link from react-router-dom
import SidepaneOptions from "../consts/sidepane/options";

const Sidepan = () => {
	const location = useLocation();

	return (
		<div className>
			<Typography
				variant="h6"
				component="div"
				gutterBottom
				sx={{ fontWeight: "light", fontSize: "1rem", mt: 2 }}
			>
				"We know what we are,
				<br /> but know not what we may be."
				<br />
				<b>William Shakespeare</b>
			</Typography>

			<Typography
				variant="h4"
				component="div"
				gutterBottom
				sx={{ fontWeight: "regular", mt: 3, mb: 2 }}
			>
				Apurbo Banik Turjo
			</Typography>

			<Box role="presentation">
				{/* My Works */}
				<List>
					<Typography
						variant="h6"
						component="div"
						mt={3}
						textTransform={"uppercase"}
					>
						My Works
					</Typography>

					{SidepaneOptions.myworks.map((text) => (
						<ListItem key={text.title} disablePadding>
							<ListItemButton
								sx={{ height: 30 }}
								component={Link}
								to={text.to}
								selected={location.pathname === text.to}
							>
								<ListItemText primary={text.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>

				{/* About Me */}
				<List>
					<Typography
						variant="h6"
						component="div"
						mt={6}
						textTransform={"uppercase"}
					>
						About Me
					</Typography>

					{SidepaneOptions.about_me.map((text) => (
						<ListItem key={text.title} disablePadding>
							<ListItemButton
								sx={{ height: 30 }}
								component={Link}
								to={text.to}
								selected={location.pathname === text.to}
							>
								<ListItemText primary={text.title} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Typography
					variant="h6"
					component="div"
					mt={10}
					textTransform={"uppercase"}
				>
					Contact
				</Typography>
				{/* Contact Me */}
				<ButtonGroup
					variant="outlined"
					aria-label="contact button group"
					sx={{ "& > *": { m: 0.5 } }} // This adds margin to all direct children
				>
					{SidepaneOptions.contact.map((item, index) => (
						<Button key={index} startIcon={item.icon} href={item.link}>
							{item.title}
						</Button>
					))}
				</ButtonGroup>
			</Box>
		</div>
	);
};

export default Sidepan;
