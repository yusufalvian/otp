import express from "express";
import { getRedisClient } from "./redis";
import * as nanoid from "nanoid";
import { Repo, getDb } from "./db";

async function main() {
  const app = express();
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Health check");
  });

  const db = await getDb();
  const repo = new Repo();

  // const OTP = nanoid.customAlphabet('1234567890', 6);

  app.post("/register", (req, res) => {
    console.log(req.body.email);
    console.log(req.body.password);
    repo.addUser(db, {
      email: req.body.email,
      password: req.body.password,
      is_active: false,
    });
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
