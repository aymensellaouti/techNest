export default () => ({
  environment: process.env.APP_ENV,
  port:process.env.APP_ENV == 'dev' ? 3000 : 3005,
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT
  }
});
