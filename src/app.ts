import express from "express";
import { userRouter } from "./db/modules/users/users.route";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouter);

export default app;
