import React from "react";
import Mydescription from "../consts/bio/mydescription";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";

const bio = () => {
	return (
		<>
			<Grid container spacing={0} className="animate-slide-up">
				<Grid item xs={12} md={5}>
					<Card sx={{ maxWidth: 345 }}>
						<CardMedia
							sx={{ height: "440px" }}
							image={Mydescription.profilephoto}
							title="green iguana"
						/>
					</Card>
				</Grid>
        
				<Grid item xs={12} md={7} disa>
        <Typography
						variant="h3"
						component="div"
						gutterBottom
						sx={{ fontWeight: "regular", mt: 3, mb: 2 }}
					>
						Apurbo Banik Turjo
					</Typography>

					<Typography
						variant="h6"
						component="div"
						gutterBottom
						sx={{ fontWeight: "regular", mt: 3, mb: 2 }}
					>
						{Mydescription.description}
					</Typography>
					
				</Grid>
			</Grid>
		</>
	);
};

export default bio;
