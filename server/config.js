const config = {
  //OBJETO CONFIGURACION, DONDE ASIGNO VARIABLES DE ENTORNO DEL SV Y BD
  serverConfig: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT || 3000,
  },
  db: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
  },
  paypal: {
    clientId:
      'AcsGv7ep6DnOYhI-kw24ht7dUOIlSzE9k4C4mpT2N1zGZBKciwonSYQ1gOtf2zMRAYcpFtnEh7IcrDfA',
    secret:
      'EKJs4H1-6Tev_jIKimpid0urXyNQOSHiuFUAB2XnEsBELlZJQ9qtgCg6U7GT5pA_6szOCL0MGC1XsbMy',
  },
};

module.exports = config;
