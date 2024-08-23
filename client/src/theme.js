import { createTheme } from "@mui/material/styles";

// Create a custom theme
const mytheme = createTheme({
	typography: {
		fontFamily: "KoHo, sans-serif",
		fontWeightLight: 200, // Equivalent to .koho-extralight
		fontWeightRegular: 300, // Equivalent to .koho-regular
		fontWeightMedium: 400, // Equivalent to .koho-light (You can assign it here)
		fontWeightBold: 500, // If you have a bold variant
		fontStyle: "normal",
		// Add other typography customizations here
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none", // Disable uppercase transformation globally for buttons
				},
			},
		},
		// Add other component overrides here
	},
});

export default mytheme;
