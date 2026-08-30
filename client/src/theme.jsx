import { createTheme } from "@mui/material/styles";

// Create a clean custom theme
const mytheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#000000",
		},
		background: {
			default: "#ffffff",
			paper: "#ffffff",
		},
		text: {
			primary: "#000000",
			secondary: "#444444",
		},
	},
	typography: {
		fontFamily: "Fira Code, monospace",
		fontWeightLight: 200,
		fontWeightRegular: 300,
		fontWeightMedium: 400,
		fontWeightBold: 500,
		fontStyle: "normal",
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: 4,
				},
			},
		},
	},
});

export default mytheme;
