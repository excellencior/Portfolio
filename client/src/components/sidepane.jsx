import { useState } from "react";
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
	const [drawerOpen, setDrawerOpen] = useState(false);

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
			sx={{ width: { xs: 280, md: 240 }, padding: { xs: "16px", md: "0px" } }}
		>
			<Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 200, fontSize: "0.8rem", mt: 2 }}>
				"We know what we are,
				<br /> but know not what we may be."
				<br />
				<b>- William Shakespeare</b>
			</Typography>

			<Typography
				variant="h5"
				component="div"
				gutterBottom
				sx={{
					fontWeight: 700,
					mt: 2,
					letterSpacing: "-1px",
					lineHeight: 1.4,
				}}
			>
				Apurbo Banik Turjo
			</Typography>

			{/* My Works List */}
			<List sx={{ mt: 2 }}>
				<Typography variant="h6" component="div" mt={2} textTransform={"uppercase"} sx={{ borderBottom: "2px solid black", fontWeight: 500, fontSize: "1rem", pb: 0.5 }}>
					My Works
				</Typography>
				{SidepaneOptions.myworks.map((item) => (
					<ListItem key={item.title} disablePadding>
						<ListItemButton
							sx={{
								height: 32,
								my: 0.25,
								"&.Mui-selected": {
									backgroundColor: "#edf4fb",
								},
							}}
							component={Link}
							to={item.to}
							selected={location.pathname === item.to}
						>
							<ListItemText primary={item.title} primaryTypographyProps={{ fontSize: "0.9rem" }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>

			{/* About Me List */}
			<List sx={{ mt: 1 }}>
				<Typography variant="h6" component="div" mt={3} textTransform={"uppercase"} sx={{ borderBottom: "2px solid black", fontWeight: 500, fontSize: "1rem", pb: 0.5 }}>
					About Me
				</Typography>
				{SidepaneOptions.about_me.map((item) => (
					<ListItem key={item.title} disablePadding>
						<ListItemButton
							sx={{
								height: 32,
								my: 0.25,
								"&.Mui-selected": {
									backgroundColor: "#edf4fb",
								},
							}}
							component={Link}
							to={item.to}
							selected={location.pathname === item.to}
						>
							<ListItemText primary={item.title} primaryTypographyProps={{ fontSize: "0.9rem" }} />
						</ListItemButton>
					</ListItem>
				))}
			</List>

			<Typography variant="h6" component="div" mt={4} textTransform={"uppercase"} sx={{ fontWeight: 500, fontSize: "1rem" }}>
				Contact
			</Typography>
			<ButtonGroup aria-label="contact button group" sx={{ mt: 1 }}>
				{SidepaneOptions.contact.map((item, index) => (
					<Button
						key={index}
						component={item.isExternal ? "a" : Link}
						to={!item.isExternal ? item.link : undefined}
						href={item.isExternal ? item.link : undefined}
						target={item.isExternal ? "_blank" : undefined}
						rel={item.isExternal ? "noopener noreferrer" : undefined}
						startIcon={item.icon}
						sx={{ border: "1px solid #ccc", minWidth: 40, px: 1 }}
					/>
				))}
			</ButtonGroup>
		</Box>
	);

	return (
		<Box sx={{ display: "flex" }}>
			<IconButton
				edge="start"
				color="inherit"
				aria-label="menu"
				onClick={toggleDrawer(true)}
				sx={{
					display: { xs: "block", md: "none" },
					position: "absolute",
					top: 16,
					left: 10,
					zIndex: 1100,
				}}
			>
				<MenuIcon />
			</IconButton>

			<Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
				{sidepaneContent}
			</Drawer>

			<Box sx={{ display: { xs: "none", md: "block" }, width: 240, position: "sticky", top: 20 }}>
				{sidepaneContent}
			</Box>
		</Box>
	);
};

export default Sidepane;
