import { Pool } from "pg";
import { config } from "../config/config";

export const pool = new Pool({
  connectionString: config.connection_string,
});

export const initDb = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role VARCHAR(20) NOT NULL DEFAULT 'contributor' 
      CHECK (role IN ('contributor', 'maintainer')),
      age int,
      created_at TIMESTAMP DEFAULT Now(),
      updated_at TIMESTAMP DEFAULT Now()
    )`);

    await pool.query(`CREATE TABLE IF NOT EXISTS issues (
     id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    description TEXT NOT NULL
    CHECK (LENGTH(description) >= 20),

    type VARCHAR(20) NOT NULL
    CHECK (type IN ('bug', 'feature_request')),

    status VARCHAR(20) DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'resolved')),

    reporter_id INTEGER NOT NULL ,

    created_at TIMESTAMP DEFAULT NOW(),

    updated_at TIMESTAMP DEFAULT NOW())`);
  } catch (err) {
    console.error("Error initializing database:", err);
  }
};
