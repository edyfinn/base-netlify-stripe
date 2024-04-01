const fetch = require('node-fetch');
const faunaDB = require('faunadb');
var q = faunaDB.query

exports.handler = async () => {
    /*return {
      statusCode: 200,
      body: "Hola Mundo Cruel!"
    };*/

    const mySecret = process.env.STRIPE_SECRET_KEY;
    const mySecret1 = process.env.FAUNA_SERVER_KEY_V10
    const mySecret2 = process.env.STRIPE_DEFAULT_PRICE_PLAN

    var client = new faunaDB.Client({
      secret: process.env.FAUNA_BD_STRIPE,
      domain: 'db.eu.fauna.com',
       scheme: 'https',
    })

    var createP = client.query(
      q.Create(q.Collection('UsuariosBuenos'), { data: { netlifyID: 'Cliente_Netlify' , stripeID: 'Cliente_Sprite' } })
    )

    
    /*createP.then(function(response) {
      console.log(response.ref) // Would log the ref to console.
    })*/


    return {
      statusCode: 200,
      body: `La clave de stripe es: ${mySecret} \n ${mySecret1} \n ${mySecret2} \n ${createP}`
    };
  };