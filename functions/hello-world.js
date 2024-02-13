const fetch = require('node-fetch');
exports.handler = async () => {
    /*return {
      statusCode: 200,
      body: "Hola Mundo Cruel!"
    };*/

    const mySecret = process.env.STRIPE_SECRET_KEY;
    return {
      statusCode: 200,
      body: `La clave de stripe es: ${mySecret}`
    };
  };