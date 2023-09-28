export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  DATABASE: {
    HOST: process.env.DATABASE_HOST,
    PORT: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
});
