import "express";

declare module "express" {
  export interface Request {
    user?: {
      id: number;
      role: "maintainer" | "contributor";
      name?: string;
    };
  }
}
