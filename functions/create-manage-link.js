const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');
const faunaDB = require('faunadb');
var q = faunaDB.query;

exports.handler = async (_event, context) => {
  const { user } = context.clientContext;

  var client = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  let respuesta = await client.query(
    q.Select('data', q.Paginate(q.Match(q.Index('getUsuarioNetlifyID'), '43be6508-e3b1-4349-9d54-379e403ee7b3')))
  );

  /*const result = await faunaFetch({
    query: `
      query ($netlifyID: ID!) {
        getUserByNetlifyID(netlifyID: $netlifyID) {
          stripeID
        }
      }
    `,
    variables: {
      netlifyID: user.sub,
    },
  });*/

  const { stripeID } = JSON.stringify(respuesta[0]);//result.data.getUserByNetlifyID;
  
  const link = await stripe.billingPortal.sessions.create({
    customer: 'cus_PwYnbMVoqWrrvc',
    return_url: process.env.URL,
  });

  return {
    statusCode: 200,
    body: `Respuesta Query faunaDB: ${stripeID}\n Usuario: ${JSON.stringify(user)}`,
    //body: JSON.stringify(link.url),
  };
};
