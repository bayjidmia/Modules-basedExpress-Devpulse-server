import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const CreateIssue = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    {
      const result = await issuesService.createIssueIndb(req.body, token);
      res.status(201).json({
        success: true,
        message: "Issue created successfully",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

export const issuesController = {
  CreateIssue,
};
