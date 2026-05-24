import { pool } from "../../db";
import {
  type Issue,
  type GetIssuesPayload,
  type IssuePayload,
  type User,
} from "./issues.interface";

const createIssueIndb = async (payload: IssuePayload, userId: number) => {
  const { title, description, type } = payload;

  const result = await pool.query(
    `INSERT INTO issues (title, description, type, reporter_id) VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, description, type, userId],
  );
  return result.rows[0];
};

const getAllIssuesFromDb = async (payload: GetIssuesPayload) => {
  const { sort = "newest", type, status } = payload;

  const conditions: string[] = [];
  const values: string[] = [];

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  let query = `SELECT * FROM issues`;

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  if (sort === "newest") {
    query += ` ORDER BY created_at DESC`;
  } else {
    query += ` ORDER BY created_at ASC`;
  }

  const result = await pool.query<Issue>(query, values);

  const issues = result.rows;
  const finaldata = [];

  for (let issue of issues) {
    const userResult = await pool.query<User>(
      `SELECT id, name, role FROM users WHERE id = $1`,
      [issue.reporter_id],
    );
    finaldata.push({
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: userResult.rows[0],
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    });
  }
  return finaldata;
};

const getIssueByIdFromDb = async (id: number) => {
  const result = await pool.query<Issue>(`SELECT * FROM issues WHERE id = $1`, [
    id,
  ]);
  const issue = result.rows[0];
  if (!issue) {
    throw new Error("Issue not found");
  }
  const user = await pool.query<User>(
    `SELECT id, name, role FROM users WHERE id = $1`,
    [issue.reporter_id],
  );
  return {
    id: issue.id,
    title: issue.title,
    description: issue.description,
    type: issue.type,
    status: issue.status,
    reporter: user.rows[0],
    created_at: issue.created_at,
    updated_at: issue.updated_at,
  };
};

const updateIssueInDb = async (
  id: number,
  payload: IssuePayload,
  role: "maintainer" | "contributor",
  userId: number,
) => {
  const { title, description, type, status } = payload;

  const issueResult = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
    id,
  ]);

  const issue = issueResult.rows[0];

  if (!issue) {
    throw new Error("Issue not found");
  }

  if (role === "contributor") {
    if (issue.reporter_id !== userId) {
      throw new Error("Forbidden: You cannot update this issue");
    }

    if (issue.status !== "open") {
      throw new Error("Forbidden: Only open issues can be updated");
    }
  }

  let updatedIssueResult;

  if (role === "maintainer") {
    updatedIssueResult = await pool.query(
      `
      UPDATE issues
      SET 
        title = $1,
        description = $2,
        type = $3,
        status = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING *;
      `,
      [title, description, type, status, id],
    );
  } else {
    updatedIssueResult = await pool.query(
      `
      UPDATE issues
      SET 
        title = $1,
        description = $2,
        type = $3,
        updated_at = NOW()
      WHERE id = $4
      RETURNING *;
      `,
      [title, description, type, id],
    );
  }

  return updatedIssueResult.rows[0];
};

const deleteIssueFromDb = async (id: number) => {
  const issueResult = await pool.query(`SELECT * FROM issues WHERE id = $1`, [
    id,
  ]);
  const issue = issueResult.rows[0];
  if (!issue) {
    throw new Error("Issue not found");
  }

  const result = await pool.query(
    `DELETE FROM issues WHERE id = $1 RETURNING *`,
    [id],
  );
  return result.rows[0];
};

export const issuesService = {
  createIssueIndb,
  getAllIssuesFromDb,
  getIssueByIdFromDb,
  updateIssueInDb,
  deleteIssueFromDb,
};
