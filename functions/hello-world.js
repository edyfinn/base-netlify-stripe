const fetch = require('node-fetch');
exports.handler = async () => {
    /*return {
      statusCode: 200,
      body: "Hola Mundo Cruel!"
    };*/

    const mySecret = process.env.STRIPE_SECRET_KEY;
    const mySecret1 = process.env.FAUNA_SERVER_KEY
    const mySecret2 = process.env.STRIPE_DEFAULT_PRICE_PLAN
    return {
      statusCode: 200,
      body: `La clave de stripe es: ${mySecret} \n ${mySecret1} \n ${mySecret2}`
    };
  };