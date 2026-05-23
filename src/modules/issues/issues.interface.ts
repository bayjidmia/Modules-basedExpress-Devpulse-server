export interface IssuePayload {
  title: string;
  description: string;
  type: string;
  status?: string;
}

export type GetIssuesPayload = {
  sort?: "newest" | "oldest";
  type?: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
};
export interface Issue {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}
export interface User {
  id: number;
  name: string;
  role: string;
}
