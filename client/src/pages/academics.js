import React from "react";
import { Grid, Typography } from "@mui/material";
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import Academics from "../consts/academics/academics";

const AcademicsComponent = () => {
	return (
		<Grid container spacing={4} className="animate-slide-up">
			{Academics.map((academic) => (
				<React.Fragment key={academic.id}>
					<Grid item xs={12} md={4}>
						<Typography variant="h5" component="div" fontWeight={400}>
							<HistoryEduIcon />&nbsp; &nbsp;
							{academic.year}
						</Typography>
						<Typography variant="h6" component="div" fontWeight={400}>
							<WorkspacesIcon />&nbsp; &nbsp;
              {academic.level}
						</Typography>
					</Grid>
					<Grid item xs={12} md={8}>
						<Typography variant="h5" component="div" fontWeight={500}>
							{academic.class}
						</Typography>
						<Typography variant="h6" component="div" fontWeight={400}>
							{academic.institution}
						</Typography>
					</Grid>
				</React.Fragment>
			))}
		</Grid>
	);
};

export default AcademicsComponent;
