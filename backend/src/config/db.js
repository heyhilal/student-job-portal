import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "student_job_portal",
  port: 3307
});
