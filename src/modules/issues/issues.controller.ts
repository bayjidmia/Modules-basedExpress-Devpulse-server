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

const GetAllIssues = async (req: Request, res: Response) => {
  try {
    const result = await issuesService.getAllIssuesFromDb(req.query);
    res.status(200).json({
      success: true,
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
  const token = req.headers.authorization;

  if (isNaN(numericId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
      data: null,
    });
  }

  try {
    const result = await issuesService.updateIssueInDb(
      numericId,
      req.body,
      token,
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
  const token = req.headers.authorization;

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
    const result = await issuesService.deleteIssueFromDb(numericId, token);
    res.status(200).json({
      success: true,
      message: "Issue deleted successfully",
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

export const issuesController = {
  CreateIssue,
  GetAllIssues,
  GetIssueById,
  UpdateIssue,
  DeleteIssue,
};
