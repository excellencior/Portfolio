import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

export default function ProjectCard({ title, description, imageurl, repoLink, tags, date, deployedAt }) {
	return (
		<Card sx={{ marginLeft: "10%" ,maxWidth: "70%", border: "2px solid black" }}>
			<CardMedia sx={{ height: 216 }} image={imageurl} title={title} />

			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{title}
				</Typography>

				<Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
					{description}
				</Typography>

				<Typography variant="caption" sx={{ display: "block", mb: 1 }}>
					📅 {date}
				</Typography>

				{deployedAt && (
					<Typography variant="body2" sx={{ mb: 1 }}>
						🌐 <Link href={`https://${deployedAt}`} target="_blank" underline="hover">
							Try out
						</Link>
					</Typography>
				)}


				<Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
					{tags?.map((tag) => (
						<Chip key={tag} label={tag} size="small" variant="outlined" />
					))}
				</Stack>
			</CardContent>

			<CardActions sx={{ justifyContent: "flex-end" }}>
				{repoLink ? (
					<Button
						size="small"
						href={repoLink}
						target="_blank"
						sx={{ border: "2px solid black", color: "black", py: 0 }}
						className="link-hover"
					>
						View Repo
					</Button>
				) : (
					<Typography sx={{ color: "gray", fontSize: 14 }}>
						Repo: Not publicly accessible
					</Typography>
				)}
			</CardActions>
		</Card>
	);
}
