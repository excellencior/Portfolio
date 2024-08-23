import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Contact form server is running");
});

// API endpoint to handle form submission
router.post("/send", (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.EMAIL, // Your email address
        subject: `PORTFOLIO CONTACT FORM: Message from ${name}`,
        text: `${message} | Sent from: ${email}`,
    };
    console.log(mailOptions)

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send("Error sending email");
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully");
        }
    });
});

export default router;