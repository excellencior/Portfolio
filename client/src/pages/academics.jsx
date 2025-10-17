import { Grid, Typography, Box, Chip, Avatar } from "@mui/material";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Academics from "../consts/academics/academics";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


const AcademicsComponent = () => {
	return (
		<Grid container spacing={4} className="animate-slide-up">
			{Academics.map((academic) => (
				<Grid container item key={academic.id} alignItems="flex-start">
					{/* Icon column */}
					<Grid item xs={1} md={1}>
						<Box sx={{ display: "flex", justifyContent: "center" }}>
							<HistoryEduIcon fontSize="large" />
						</Box>
					</Grid>

					{/* Academic info column */}
					<Grid item xs={11} md={11}>

						<Grid container>

							<Grid item xs={12} md={3}>
								<Typography variant="h6" fontWeight={400}>
									{academic.year}
								</Typography>
								<Typography variant="body1" fontWeight={400}>
									{academic.level}
								</Typography>
							</Grid>

							<Grid item xs={12} md={9}>
								<Typography variant="h6" fontWeight={400}>
									{academic.institution}
								</Typography>
								<Typography variant="body1" fontWeight={500}>
									{academic.class}
								</Typography>
								<Chip
									avatar={<Avatar sx={{ bgcolor: "transparent" }}><ArrowOutwardIcon fontSize="small"/></Avatar>}
									label={academic.location.place}
									variant="outlined"
									size="small"
									component="a"
									href={academic.location.link}
									target="_blank"
									clickable
									className="link-hover"
								/>
							</Grid>

						</Grid>

					</Grid>
				</Grid>
			))}
		</Grid>
	);
};

export default AcademicsComponent;
