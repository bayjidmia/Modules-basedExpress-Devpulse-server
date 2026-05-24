import type { Request, Response } from "express";
import { issuesService } from "./issues.service";

const CreateIssue = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    {
      const result = await issuesService.createIssueIndb(req.body, user.id);
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

const GetAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getAllIssuesFromDb(req.query);
    res.status(200).json({
      success: true,
      message: "Issues retrived successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

const GetIssueById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
      data: null,
    });
  }
  try {
    const result = await issuesService.getIssueByIdFromDb(numericId);
    res.status(200).json({
      success: true,
      message: "Issue retrived successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

const UpdateIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
      data: null,
    });
  }

  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }
    const result = await issuesService.updateIssueInDb(
      numericId,
      req.body,
      user.role,
      user.id,
    );
    res.status(200).json({
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
      data: null,
    });
  }
};

const DeleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  const numericId = Number(id);
  if (isNaN(numericId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
      data: null,
    });
  }
  try {
    const result = await issuesService.deleteIssueFromDb(numericId);
    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
    });
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
  GetAllIssues,
  GetIssueById,
  UpdateIssue,
  DeleteIssue,
};
