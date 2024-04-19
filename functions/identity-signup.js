const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { queryCrearNetIDStripeID, faunaConexion, faunaFetch } = require('./utils/fauna');
const faunaDB = require('faunadb');
var q = faunaDB.query

exports.handler = async (event) => {
  const { user } = JSON.parse(event.body);

  // create a new customer in Stripe
  const customer = await stripe.customers.create({ name: user.user_metadata.full_name, email: user.email, });

  // subscribe the new customer to the plan con 10 días de prueba
  await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: process.env.STRIPE_BASE_PLAN,
      },
    ],
    trial_period_days: 10,
    trial_settings:
     {
      end_behavior: {
        missing_payment_method: 'pause'
      }
    },
  });


  //Conexión faunaDB
  await queryCrearNetIDStripeID(user.id, customer.id);

  /*var client = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  // store the Netlify and Stripe IDs in Fauna
  await client.query(
    q.Create(q.Collection('UsuariosBuenos'), { data: { netlifyID: user.id , stripeID: customer.id } })
  );*/


  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        roles: ['base'],
      },
    }),
  };
};
