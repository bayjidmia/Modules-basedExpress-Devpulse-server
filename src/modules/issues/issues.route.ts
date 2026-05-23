import { Router } from "express";
import { issuesController } from "./issues.controller";

const route = Router();

route.post("/", issuesController.CreateIssue);
route.get("/", issuesController.GetAllIssues);
route.get("/:id", issuesController.GetIssueById);
route.patch("/:id", issuesController.UpdateIssue);
route.delete("/:id", issuesController.DeleteIssue);

export const issuesRoute = route;
