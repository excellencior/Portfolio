import React from "react";
import { Typography } from "@mui/material";

const TopPane = ({ title }) => {
	return (
		<Typography
			variant="h4"
			component="div"
			gutterBottom
			sx={{ fontWeight: "regular", mt: 3, mb: 5 }}
		>
			{title}
		</Typography>
	);
};

export default TopPane;
