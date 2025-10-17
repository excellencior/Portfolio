import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ProjectCard({ title, description, imageurl, link, tags }) {
	return (
		<Card sx={{ maxWidth: 350, border: "2px solid black" }}>
			<CardMedia
				sx={{ height: 180 }}
				image={imageurl}
				title={title}
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>
				<Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
					{description}
				</Typography>
				<Typography variant="caption" sx={{ display: "block", mb: 1 }}>
					{tags?.map((tag) => `#${tag} `)}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small" href={link} target="_blank">
					View Repo
				</Button>
			</CardActions>
		</Card>
	);
}
