import { Router } from "express";
import { issuesController } from "./issues.controller";

const route = Router();

route.post("/", issuesController.CreateIssue);

export const issuesRoute = route;
