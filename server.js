// express server
const express = require("express");
const app = express();

// parse body
app.use(express.json());

// nodemailer using outlook
const nodeoutlook = require("nodejs-nodemailer-outlook");

// health check
app.get("/", (req, res) => {
  res.send("Health check");
});

// get data from env
require("dotenv").config();
const emailUsername = process.env.EMAIL_OUTLOOK_USERNAME;
const emailPassword = process.env.EMAIL_OUTLOOK_PASSWORD;

// generate random otp
const nanoid = require("nanoid");
const OTP = nanoid.customAlphabet("1234567890", 6)();

app.post("/auth", (req, res) => {
  console.log("req: ", req.body);
  // email server

  nodeoutlook.sendEmail({
    auth: {
      user: emailUsername,
      pass: emailPassword,
    },
    from: emailUsername,
    to: req.body.email,
    subject: "OTP",
    text: `Your One Time Password is ${OTP}`,
    onError: (e) => res.status(500).json({ message: `an error occurred ${e}` }),
    onSuccess: (i) => res.status(200).json({ message: i }),
  });
});

// listen to port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
