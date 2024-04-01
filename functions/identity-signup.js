const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaFetch } = require('./utils/fauna');
const faunaDB = require('faunadb');
var q = faunaDB.query

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  // create a new customer in Stripe
  const customer = await stripe.customers.create({ name: user.user_metadata.full_name, email: user.email, });

  // subscribe the new customer to the free plan
  await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: process.env.STRIPE_DEFAULT_PRICE_PLAN,
      },
    ],
  });


  var client = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
     scheme: 'https',
  });

  await client.query(
    q.Create(q.Collection('UsuariosBuenos'), { data: { netlifyID: user.id , stripeID: customer.id } })
  );

  // store the Netlify and Stripe IDs in Fauna
  //await faunaFetch();

  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['free'],
      },
    }),
  };
};
