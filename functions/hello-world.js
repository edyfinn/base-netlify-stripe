const fetch = require('node-fetch');
const faunaDB = require('faunadb');
var q = faunaDB.query;

exports.handler = async () => {
    /*return {
      statusCode: 200,
      body: "Hola Mundo Cruel!"
    };*/

    /*const { user } = context.clientContext;
    console.log("Usuario: " + user.sub);*/

    const mySecret = process.env.STRIPE_SECRET_KEY;
    const mySecret1 = process.env.FAUNA_SERVER_KEY_V10
    const mySecret2 = process.env.STRIPE_DEFAULT_PRICE_PLAN

    var client = new faunaDB.Client({
      secret: process.env.FAUNA_BD_STRIPE,
      domain: 'db.eu.fauna.com',
      scheme: 'https',
    });

    var respuesta = await client.query(
      q.Map(
          q.Paginate(
              q.Match(
                  q.Index('getUsuarioNetlifyID'),'43be6508-e3b1-4349-9d54-379e403ee7b3'
              )
          )
      )
    );
    //console.log("respuesta: ", respuesta);

    /*var createP = client.query(
      q.Create(q.Collection('UsuariosBuenos'), { data: { netlifyID: 'Cliente_Netlify_hola' , stripeID: 'Cliente_Sprite_hola' } })
    );*/
    
    /*createP.then(function(response) {
      console.log(response.ref)
    })*/


    return {
      statusCode: 200,
      //body: `La clave de stripe es: ${mySecret} \n ${mySecret1} \n ${mySecret2} \n ${createP}`,
      body: `La clave de stripe NO SE MUESTRA: ${JSON.stringify(respuesta)}`,
    };
  };

