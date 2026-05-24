import type { Request, Response } from "express";
import { userService } from "./users.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.createUserInDb(req.body);
    res.status(201).json({
      success: true,
      message: " User registered successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const userController = {
  createUser,
};
