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
		<Card sx={{ maxWidth: { xs: "100%", md: "85%" }, border: "2px solid black", borderRadius: 1, mb: 2 }}>
			{imageurl && (
				<CardMedia sx={{ height: 220, objectFit: "cover" }} image={imageurl} title={title} />
			)}

			<CardContent>
				<Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 500 }}>
					{title}
				</Typography>

				<Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5, lineHeight: 1.6 }}>
					{description}
				</Typography>

				{date && (
					<Typography variant="caption" sx={{ display: "block", mb: 1, color: "#666" }}>
						📅 {date}
					</Typography>
				)}

				{deployedAt && (
					<Typography variant="body2" sx={{ mb: 1 }}>
						🌐 <Link href={`https://${deployedAt.replace(/^https?:\/\//, "")}`} target="_blank" underline="hover">
							Try out
						</Link>
					</Typography>
				)}

				{tags && (
					<Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 0.5, mt: 1 }}>
						{tags.map((tag) => (
							<Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderRadius: 1 }} />
						))}
					</Stack>
				)}
			</CardContent>

			<CardActions sx={{ justifyContent: "flex-end", p: 1.5 }}>
				{repoLink ? (
					<Button
						size="small"
						href={repoLink}
						target="_blank"
						sx={{ border: "2px solid black", color: "black", py: 0.25, px: 1.5 }}
						className="link-hover"
					>
						View Repo
					</Button>
				) : (
					<Typography sx={{ color: "gray", fontSize: 13 }}>
						Repo: Private / Internal
					</Typography>
				)}
			</CardActions>
		</Card>
	);
}
