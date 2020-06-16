const paypalController = {};
const axios = require('axios');
const uniqid = require('uniqid');
const http = require('https');
const { paypal } = require('../config');

paypalController.getTokenPaypal = async (req, res) => {
  let username = paypal.clientId;
  let password = paypal.secret;
  (async () => {
    try {
      const {
        data: { access_token, token_type },
      } = await axios({
        //desestruc de datos par aobtener access_token
        url: 'https://api.sandbox.paypal.com/v1/oauth2/token', //cambiar esta url en produccion https://api.paypal.com
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Accept-Language': 'en_US',
          'content-type': 'application/x-www-form-urlencoded',
        },
        auth: {
          username: username, //tu username es tu client id
          password: password, //tu password es tu secret
        },
        params: {
          grant_type: 'client_credentials',
        },
      });

      //Devolver respuesta con el token
      return res.status(200).send({
        status: 'success',
        message: 'Su token es:',
        access_token: access_token,
        token_type: token_type,
      });
    } catch (error) {
      console.log('error: ', error);

      //Sila peticion axios fallo
      return res.status(400).send({
        status: 'error',
        message: 'Error de paypal, revisar logs',
      });
    }
  })();
};
paypalController.generatePayOut = async (req, res) => {
  const params = req.body;
  let modo = params.modo;
  let batch_code = uniqid();
  let options = {
    method: 'POST',
    hostname: 'api.sandbox.paypal.com',
    port: null,
    path: '/v1/payments/payouts',
    headers: {
      accept: 'application/json',
      authorization:
        'Bearer A21AAGKhkGErKbxP_UAL12iiCPMc9r-42tllRyXojtif7xwZkHEshaX5nECkZ0sUiY0T-s1yuSc976bHdps1A4AM_qeaS0pgw',
      'content-type': 'application/json',
    },
  };
  let request = http.request(options, function (res) {
    var chunks = [];
    res.on('data', function (chunk) {
      chunks.push(chunk);
    });
    res.on('end', function () {
      let body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  console.log(modo);
  if (modo == 'EMAIL') {
    let email = params.email; //Destinatario
    let montoCobrar = params.value; //PRECIO
    request.write(
      JSON.stringify({
        sender_batch_header: {
          email_subject: 'Pago realizado',
          sender_batch_id: 'batch' + batch_code,
          item: [
            {
              recipient_type: 'EMAIL', //actualmente usando
              amount: { value: montoCobrar, currency: 'USD' },
              receiver: email,
              note: 'Pago desde el backend con node, token working',
            },
          ],
        },
      })
    );
    request.end();

    return res.status(200).json({
      status: 'success',
      message: 'Pago realizado a ' + email,
    });
  }
  return res.status(200).json({
    status: 'Succes',
    message: 'Creando PayOut',
  });
};

module.exports = paypalController;
