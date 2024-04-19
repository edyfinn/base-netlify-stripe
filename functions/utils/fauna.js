const fetch = require('node-fetch');
const faunaDB = require('faunadb');
var q = faunaDB.query;

exports.faunaConexion = async () => {
  var client = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  return client;
}

exports.queryCrearNetIDStripeID = async (idNet, idSprite) => {
  var clientFauna = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  await clientFauna.query(
    q.Create(q.Collection('UsuariosBuenos'), { data: { netlifyID: idNet , stripeID: idSprite } })
  );

}

exports.queryStripeCliente = async (idNetlify) => {
  var clientFauna = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  const respuesta = await clientFauna.query(
    q.Select('data', q.Paginate(q.Match(q.Index('getUsuarioNetlifyID'), idNetlify)))
  );

  //clientFauna.close();
  return respuesta;
}

 exports.faunaFetch = async ({ /*query, variables*/ }) => {
  
  /*var datos = JSON.stringify({
    query,
    variables,
  });*/

  //alert(datos);
  var client = new faunaDB.Client({
    secret: process.env.FAUNA_BD_STRIPE,
    domain: 'db.eu.fauna.com',
    scheme: 'https',
  });

  /*var createP = client.query(
    q.Create(q.Collection('UsuariosBuenos'), { data: { netlifyID: 'Cliente_Netlify_ID_ID' , stripeID: 'Cliente_Sprite_ID_ID' } })
  );*/

  return {
    statusCode: 200,
    body: `Datos OK: ${client}`
  };

  /*const respuesta = await  client.query(
    q.Create(q.Collection('UsuariosBuenos'), { data: { netlifyID: 'testValue' , stripeID: 'Testeo' } })
  );
  alert(respuesta);

    client.close();*/
 };