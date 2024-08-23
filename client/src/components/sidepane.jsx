import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Typography, Drawer, IconButton } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SidepaneOptions from "../consts/sidepane/options.jsx";

const Sidepane = () => {
	const location = useLocation();
	const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer open/close

	const toggleDrawer = (open) => (event) => {
		if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
			return;
		}
		setDrawerOpen(open);
	};

	const sidepaneContent = (
		<Box
			role="presentation"
			onClick={toggleDrawer(false)}
			onKeyDown={toggleDrawer(false)}
			sx={{ width: { xs: 300, md: 250 }, padding: { xs: '16px', md: '0px' } }}
		>
			{/* Drawer content goes here */}
			<Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: "light", fontSize: "1rem", mt: 2 }}>
				"We know what we are,
				<br /> but know not what we may be."
				<br />
				<b>William Shakespeare</b>
			</Typography>

			<Typography variant="h4" component="div" gutterBottom sx={{ fontWeight: "regular", mt: 3, mb: 2 }}>
				Apurbo Banik Turjo
			</Typography>

			{/* My Works List */}
			<List>
				<Typography variant="h6" component="div" mt={3} textTransform={"uppercase"}>
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

			{/* About Me List */}
			<List>
				<Typography variant="h6" component="div" mt={6} textTransform={"uppercase"}>
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

			<Typography variant="h6" component="div" mt={10} textTransform={"uppercase"}>
				Contact
			</Typography>
			<ButtonGroup variant="outlined" aria-label="contact button group" sx={{ "& > *": { m: 0.5 } }}>
				{SidepaneOptions.contact.map((item, index) => (
					<Button key={index} startIcon={item.icon} href={item.link}>
						{item.title}
					</Button>
				))}
			</ButtonGroup>
		</Box>
	);

	return (
		<Box sx={{ display: 'flex' }}>
			{/* Button to open the drawer for mobile */}
			<IconButton
				edge="start"
				color="inherit"
				aria-label="menu"
				onClick={toggleDrawer(true)}
				sx={{
					display: { xs: "block", md: "none" }, // Show only on mobile
					position: "absolute",
					top: 16,
					left: 16,
				}}
			>
				<MenuIcon />
			</IconButton>

			<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
				{sidepaneContent}
			</Drawer>

			<Box sx={{ display: { xs: "none", md: "block" }, width: 250 }}>
				{sidepaneContent}
			</Box>
		</Box>
	);
};

export default Sidepane;
