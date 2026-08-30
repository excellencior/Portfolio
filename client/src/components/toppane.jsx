import { Typography } from "@mui/material";

const TopPane = ({ title }) => {
	return (
		<Typography
			variant="h4"
			component="div"
			gutterBottom
			sx={{ fontWeight: 300, mt: 3, mb: 5 }}
		>
			{title}
		</Typography>
	);
};

export default TopPane;