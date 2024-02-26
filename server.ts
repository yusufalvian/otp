import express from "express";
import { getRedisClient } from "./redis";
import { generate } from 'shortid';
import { Repo, getDb } from "./db";
import { Email } from "./email";
import dotenv from 'dotenv';


async function main() {
  const app = express();
  app.use(express.json());
  dotenv.config();

  const db = await getDb();
  const repo = new Repo();
  const email = new Email();

  app.get("/", (req, res) => {
    res.send("Health check");
  });

  app.post("/register", async (req, res) => {

    await repo.addUser(db, {
      email: req.body.email,
      password: req.body.password,
      is_active: false,
    });


    const OTP = generate();
    console.log(OTP);
    await email.sendToEmail(req.body.email, OTP);
    res.send("register success, next enter otp sent to your email to activate your account");
    res.status(200);
  });

  // listen to port
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

main().catch((error) => {
  console.log(error);
});
