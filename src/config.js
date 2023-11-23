export const db = {
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123456",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || "taskprueba",
};

export const port = process.env.PORT || 4000;