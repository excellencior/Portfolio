import React, { useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import axios from "axios";

const ReachOutArea = ({
	width,
	label,
	name,
	isMultiline = false,
	value,
	onChange,
	error,
	helperText,
}) => {
	return (
		<Box
			component="div"
			sx={{
				"& > :not(style)": { m: 2, width: width },
			}}
			noValidate
			autoComplete="off"
		>
			<TextField
				required
				id="outlined-basic"
				label={label}
				variant="outlined"
				name={name}
				value={value}
				onChange={onChange}
				{...(isMultiline && { multiline: true })}
				error={error} // Display error if validation fails
				helperText={helperText} // Show the error message
			/>
		</Box>
	);
};

const Mail = () => {
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [openBackdrop, setOpenBackdrop] = useState(false);

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

		//  Check if the email contains an '@' symbol
		if (name === "email") {
			setEmailError(!value.includes("@"));
		}
	};

	const showAlert = (message) => {
		setAlertMessage(message);
		setOpenSnackbar(true);
		setOpenBackdrop(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!emailError && formData.email && formData.name && formData.message) {
			setOpenBackdrop(true);
			// Process the form if there's no email error
			axios
				.post("/mail/send", formData)
				.then((response) => {
					showAlert("Email sent successfully");
				})
				.catch((error) => {
					showAlert("Error sending email");
				});
		} else {
			// Optionally, handle the case where the form is submitted with an error
			showAlert("Please fill in all fields correctly");
		}
	};

	// =============================
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenSnackbar(false);
	};

	return (
		<>
			<Grid container marginTop={2} spacing={1} className="animate-slide-up">
				<Grid item xs={10} md={10}>
					<ReachOutArea
						width="40ch"
						label="Your Name"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</Grid>
				<Grid item xs={10} md={10}>
					<ReachOutArea
						width="40ch"
						label="Your Email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						error={emailError} // Pass the email error state
						helperText={
							emailError ? "Invalid email address. Must contain '@'." : ""
						}
					/>
				</Grid>
				<Grid item xs={10} md={10}>
					<ReachOutArea
						width="80ch"
						label="Your Message"
						name="message"
						isMultiline={true}
						value={formData.message}
						onChange={handleChange}
						helperText={"Type your message here. MULTILINE supported."}
					/>
				</Grid>
				<Grid item margin={2} xs={10} md={10} style={{ textAlign: "right" }}>
					<Button variant="contained" onClick={handleSubmit}>
						Send Message &nbsp; <SendIcon fontSize="small" />
					</Button>
				</Grid>
			</Grid>

			{/* Snackbar component */}
			{openSnackbar && (
				<Snackbar
					open={openSnackbar}
					autoHideDuration={2000}
					onClose={handleClose}
				>
					<Alert
						onClose={handleClose}
						severity={alertMessage === "Email sent successfully" ? "success" : "error"}
						variant="filled"
						sx={{ width: "100%" }}
					>
						{alertMessage}
					</Alert>
				</Snackbar>
			)}

			{openBackdrop && (
				 <div>
				 <Backdrop
				   sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				   open={openBackdrop}
				//    onClick={handleClose} // Optional: Close the backdrop on click anywhere in the screen
				 >
				   <CircularProgress color="inherit" />
				 </Backdrop>
			   </div>
			)}
		</>
	);
};

export default Mail;
