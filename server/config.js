const config = {
  serverConfig: {
    port: process.env.APP_PORT || 3000,
  },
  db: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
  },
};

module.exports = config;
