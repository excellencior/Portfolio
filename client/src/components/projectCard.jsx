import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function ProjectCard({ title, description, imageurl, link, tags }) {
	return (
		<Card sx={{ maxWidth: 345, border: "2px solid black" }}>
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

				<Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
					{tags?.map((tag) => (
						<Chip key={tag} label={tag} size="small" variant="outlined" />
					))}
				</Stack>

			</CardContent>

			<CardActions sx={{ justifyContent: "flex-end" }}>
				<Button 
					size="small" 
					href={link} 
					target="_blank" 
					sx={{border: "2px solid black", color:"black", py:0}}
					className="link-hover"
					>
						View Repo
				</Button>
			</CardActions>

		</Card>
	);
}
