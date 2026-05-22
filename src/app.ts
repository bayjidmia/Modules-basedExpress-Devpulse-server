import express from "express";
import { userRouter } from "./modules/users/users.route";
import { authRoute } from "./modules/auth/auth.route";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRouter);
app.use("/api/auth", authRoute);

export default app;
