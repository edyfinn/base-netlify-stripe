const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { faunaConexion, faunaFetch } = require('./utils/fauna');
const faunaDB = require('faunadb');
var q = faunaDB.query;

exports.handler = async (_event, context) => {
  const { user } = context.clientContext;

  //console.log(JSON.stringify(user.sub));
  //const [spriteID, link1] = await Promise.allSettled([getClienteStripe(user.sub), getLinkPago(spriteID)]);
  //const [spriteID] = await Promise.allSettled([getClienteStripe(user.sub)]);
  var spri = await getClienteStripe(user.sub);

  return {
    statusCode: 200,
    //body: `Respuesta Query faunaDB: ${JSON.stringify(respuesta[0])}\n Usuario: ${JSON.stringify(user)}`,
    body: JSON.stringify(spri.url),
    //body: JSON.stringify(spri[0]),
  };
};


async function getClienteStripe(id_netlify) {
  /*var client = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });*/

  var cliente = await faunaConexion();
  const respuesta = await cliente.query(
    q.Select('data', q.Paginate(q.Match(q.Index('getUsuarioNetlifyID'), id_netlify)))
  );

  //var parseID = JSON.stringify(respuesta.value[0]);
  const link = await stripe.billingPortal.sessions.create({
    customer: respuesta[0],
    return_url: process.env.URL,
  });

  return link;

  //console.log(JSON.stringify(respuesta[0]))
  //return JSON.stringify(respuesta.value[0]);
}

async function getLinkPago(cliente) {
  console.log(cliente);
   const link = await stripe.billingPortal.sessions.create({
     customer: 'cus_PwYnbMVoqWrrvc',
     return_url: process.env.URL,
   });
   return link;
 }
