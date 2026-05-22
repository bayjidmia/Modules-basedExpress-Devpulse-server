export interface JwtPayload {
  id: number;
  name: string;
  role: string;
}

export interface UserwithoutPassword {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}
