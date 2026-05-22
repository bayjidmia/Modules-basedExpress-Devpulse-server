import { Router } from "express";
import { userController } from "../users.controller";

const route = Router();

route.post("/", userController.createUser);

export const userRouter = route;
