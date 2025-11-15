import { Grid2, Typography, Box, Chip, Avatar } from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AcademicsDetails from "../consts/academics/academics";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

const Academics = () => {
	return (
		<Grid2 container spacing={4} className="animate-slide-up">
			{AcademicsDetails.map((academic) => (
				<Grid2
					size={12}
					key={academic.id}
				>
					<Grid2 container spacing={2} alignItems="flex-start">
						{/* Icon */}
						<Grid2 size={{ xs: 12, sm: 1 }}>
							<Box sx={{ display: "flex", justifyContent: { xs: "flex-start", sm: "center" } }}>
								<HistoryEduIcon fontSize="large" />
							</Box>
						</Grid2>

						{/* Info */}
						<Grid2 size={{ xs: 12, sm: 11 }}>
							<Grid2 container spacing={2}>
								<Grid2 size={{ xs: 12, md: 3 }}>
									<Typography variant="h6">{academic.year}</Typography>
									<Typography variant="body1">{academic.level}</Typography>
								</Grid2>

								<Grid2 size={{ xs: 12, md: 9 }}>
									<Typography variant="h6">{academic.institution}</Typography>
									<Typography variant="body1" fontWeight={500}>
										{academic.class}
									</Typography>

									<Chip
										avatar={
											<Avatar sx={{ bgcolor: "transparent" }}>
												<ArrowOutwardIcon fontSize="small" />
											</Avatar>
										}
										label={academic.location.place}
										variant="outlined"
										size="small"
										component="a"
										href={academic.location.link}
										target="_blank"
										clickable
										sx={{ mt: 1 }}
									/>
								</Grid2>
							</Grid2>
						</Grid2>
					</Grid2>
				</Grid2>
			))}
		</Grid2>
	);
};

export default Academics;