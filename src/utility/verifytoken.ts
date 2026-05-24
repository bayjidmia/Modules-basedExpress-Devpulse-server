import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwt_secret as string) as {
    id: number;
    role: "maintainer" | "contributor";
  };
};
