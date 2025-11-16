import Mydescription from "../consts/bio/mydescription";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

const bio = () => {
	return (
		<>
			<Grid container spacing={5} className="animate-slide-up">
				<Grid size={{ xs: 12, lg: 5 }}>
					<Card sx={{ maxWidth: 345 }}>
						<CardMedia
							sx={{ height: "440px" }}
							image={Mydescription.profilephoto}
							title="green iguana"
						/>
					</Card>
				</Grid>

				<Grid size={{ xs:12, lg: 7 }}>
					<Typography
						variant="h3"
						component="div"
						gutterBottom
						sx={{ fontWeight: "regular", mb: 2 }}
					>
						Apurbo Banik Turjo
					</Typography>

					<Typography
						variant="body1"
						component="div"
						gutterBottom
						sx={{ fontWeight: "regular", mt: 3, mb: 2 }}
						dangerouslySetInnerHTML={{ __html: Mydescription.description }}
					/>

				</Grid>
			</Grid>
		</>
	);
};

export default bio;
