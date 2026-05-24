import { Router } from "express";
import { issuesController } from "./issues.controller";
import { authMiddleware } from "../../middleware/authmidleware";
import { roleMiddleware } from "../../middleware/rolemidleware";

const route = Router();

route.post("/", authMiddleware, issuesController.CreateIssue);
route.get("/", issuesController.GetAllIssues);
route.get("/:id", issuesController.GetIssueById);
route.patch("/:id", authMiddleware, issuesController.UpdateIssue);
route.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["maintainer"]),
  issuesController.DeleteIssue,
);

export const issuesRoute = route;
