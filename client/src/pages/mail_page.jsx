import { useState } from "react";
import { TextField, Button, Snackbar, Alert, Grid, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

const Mail = () => {
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [loading, setLoading] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [emailError, setEmailError] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));

		if (name === "email") {
			setEmailError(!value.includes("@") || !value.includes("."));
		}
	};

	const showAlert = (message) => {
		setAlertMessage(message);
		setOpenSnackbar(true);
		setLoading(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!formData.name.trim()) {
			showAlert("Please enter your name.");
			return;
		}
		if (!formData.email.trim() || emailError) {
			showAlert("Please enter a valid email address.");
			return;
		}
		if (!formData.message.trim()) {
			showAlert("Please enter your message.");
			return;
		}

		setLoading(true);
		axios
			.post("/mail/send", formData)
			.then(() => {
				showAlert("Email sent successfully!");
				setFormData({ name: "", email: "", message: "" });
			})
			.catch(() => {
				showAlert("Error sending message. Please email directly to turjob44@gmail.com");
			});
	};

	const handleClose = (_event, reason) => {
		if (reason === "clickaway") return;
		setOpenSnackbar(false);
	};

	return (
		<div>
			<h2>Contact</h2>

			<Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, maxWidth: "650px" }}>
				<Grid container spacing={2}>
					<Grid size={12}>
						<TextField
							required
							fullWidth
							label="Your Name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							variant="outlined"
							size="small"
						/>
					</Grid>
					<Grid size={12}>
						<TextField
							required
							fullWidth
							label="Your Email"
							name="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							variant="outlined"
							size="small"
							error={emailError}
							helperText={emailError ? "Please enter a valid email address." : ""}
						/>
					</Grid>
					<Grid size={12}>
						<TextField
							required
							fullWidth
							multiline
							rows={5}
							label="Your Message"
							name="message"
							value={formData.message}
							onChange={handleChange}
							variant="outlined"
						/>
					</Grid>
					<Grid size={12}>
						<Button
							type="submit"
							variant="contained"
							disabled={loading}
							endIcon={<SendIcon />}
							sx={{
								backgroundColor: "var(--primary-color)",
								color: "#ffffff",
								"&:hover": { backgroundColor: "var(--primary-hover)" },
								px: 3,
							}}
						>
							{loading ? "Sending..." : "Send Message"}
						</Button>
					</Grid>
				</Grid>
			</Box>

			{openSnackbar && (
				<Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleClose}>
					<Alert onClose={handleClose} severity="info" variant="filled" sx={{ width: "100%" }}>
						{alertMessage}
					</Alert>
				</Snackbar>
			)}
		</div>
	);
};

export default Mail;
