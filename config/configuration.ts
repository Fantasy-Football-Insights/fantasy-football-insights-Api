export default () => ({
  JWT_SECRET: process.env.SECRET_KEY || "secretKey",
  PORT: parseInt(process.env.PORT, 10) || 3000,
  database: {
    type: "mysql",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
});
