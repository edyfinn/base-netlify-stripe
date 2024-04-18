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

  
  const respuesta = await client.query(
    q.Select('data', q.Paginate(q.Match(q.Index('getUsuarioNetlifyID'), 'ba31a0e6-dac9-425a-9b46-246dfd4e906f')))
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
  
  /*const link = await stripe.billingPortal.sessions.create({
    customer: 'cus_PwYnbMVoqWrrvc',
    return_url: process.env.URL,
  });*/

  //const [someResult, anotherResult] = await Promise.all([printNumber1(), printNumber2()]);
  const [link,Promise1Result] = await Promise.allSettled([Promise1(user.sub), Promise2()]);

  /*console.log(Promise1Result); // {status: "rejected", reason: "Success!"}
  console.log(Promise2Result); // {status: "fulfilled", value: "Success!"}
*/
  return {
    statusCode: 200,
    //body: `Respuesta Query faunaDB: ${JSON.stringify(respuesta[0])}\n Usuario: ${JSON.stringify(user)}`,
    body: link.url,
  };
};

async function Promise1(cliente) {
  /*return new Promise((resolve,reject) => {
    setTimeout(() => {
    console.log("Number1 is done");
    resolve(10);
    },1000);
 });*/
  const link = stripe.billingPortal.sessions.create({
    customer: 'cus_PwYnbMVoqWrrvc',
    return_url: process.env.URL,
  });
  return link;
}

async function Promise2() {
  return "Success!";
}



function printNumber1() {
  return new Promise((resolve,reject) => {
     setTimeout(() => {
     console.log("Number1 is done");
     resolve(10);
     },1000);
  });
}

function printNumber2() {
  return new Promise((resolve,reject) => {
     setTimeout(() => {
     console.log("Number2 is done");
     resolve(20);
     },500);
  });
}
