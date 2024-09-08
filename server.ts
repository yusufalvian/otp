import express from "express";
import { getRedisClient } from "./redis";
import { generate } from 'shortid';
import { Repo, getDb } from "./db";
import { Email } from "./email";
import dotenv from 'dotenv';


async function main() {
  dotenv.config();

  const app = express();
  app.use(express.json());

  const db = await getDb();
  const redisClient = await getRedisClient();

  const repo = new Repo();
  const email = new Email();

  app.get("/", (req, res) => {
    res.send("Health check");
  });

  // register user 
  // save user data to db with is_active = false
  // generate otp
  // save to redis with expiry time
  // send otp to user email
  // return success message and let user get otp in email
  app.post("/register", async (req, res) => {

    await repo.addUser(db, {
      email: req.body.email,
      password: req.body.password,
      is_active: false,
    });

    const OTP = generate();

    await redisClient.set(req.body.email, OTP);
    await redisClient.expire(req.body.email, 60);

    await email.sendToEmail(req.body.email, OTP);

    res.send("register success, next enter otp sent to your email to activate your account");
    res.status(200);
  });

  // user input email and otp
  // check otp is valid or not
  // if valid, change is_active to true, and then return success message
  app.post('/verify', async (req, res) => {

    const validOtp = await redisClient.get(req.body.email);

    if (req.body.otp !== validOtp) {
      res.send("OTP is false, try again");
      res.status(400);
    } else {

      await repo.updateUser(db, {
        email: req.body.email,
        password: "",
        is_active: true,
      });
      res.send("your account is activated, you can now login");
      res.status(200);
    }
  });

  // generate new otp 
  // save to redis with expiry time. it will replace the old otp in redis
  // send otp to user email
  app.post('/resend', async (req, res) => {
    const OTP = generate();

    await redisClient.set(req.body.email, OTP);
    await redisClient.expire(req.body.email, 60);

    await email.sendToEmail(req.body.email, OTP);

    res.send("resend success, next enter otp sent to your email to activate your account");
    res.status(200);
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}

main().catch((error) => {
  console.log(error);
});
