import { config } from "../../config/config";
import { pool } from "../../db";
import type { IssuePayload } from "./issues.interface";
import jwt from "jsonwebtoken";

const createIssueIndb = async (
  payload: IssuePayload,
  token: string | undefined,
) => {
  const { title, description, type } = payload;
  const accessToken = token;
  console.log(token);
  if (!accessToken) {
    throw new Error("Unauthorized access");
  }
  const decoded = jwt.verify(
    accessToken as string,
    config.jwt_secret as string,
  );

  const id = (decoded as jwt.JwtPayload).id;

  const result = await pool.query(
    `INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, description, type, id],
  );
  return result.rows[0];
};

export const issuesService = {
  createIssueIndb,
};
