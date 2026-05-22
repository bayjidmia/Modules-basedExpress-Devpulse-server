import { pool } from "../../db";
import bcrypt from "bcrypt";
import type { JwtPayload, UserwithoutPassword } from "./auth.interface";
import { config } from "../../config/config";
import jwt from "jsonwebtoken";

const userloginInDb = async (payload: { email: string; password: string }) => {
  const { email, password } = payload;
  const userData = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);

  if (userData.rows.length === 0) {
    throw new Error("Invalid email or password");
  }

  const user = userData.rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid usercredentials");
  }

  const jwtpayload: JwtPayload = {
    id: user.id,
    name: user.name,
    role: user.role,
  };

  const token = jwt.sign(jwtpayload, config.jwt_secret, {
    expiresIn: "7d",
  });
  const userWithoutPassword: UserwithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
  return { token, user: userWithoutPassword };
};

export const authService = {
  userloginInDb,
};
