export default () => ({
  environment: process.env.APP_ENV,
  port:process.env.APP_ENV == 'dev' ? 8080 : 3000,
  database: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT
  }
});
