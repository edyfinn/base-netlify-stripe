const fetch = require('node-fetch');
import { Client, fql, FaunaError } from "faunadb";


//const client = new Client();
// To configure your client:
const client = new Client({
   secret: process.env.FAUNA_BD_STRIPE,
   domain: 'db.eu.fauna.com',
    scheme: 'https',
 });
 var q = faunadb.query;

 const collectionName = "UsuariosBuenos";
 const collectionExists = (name) => fql`Collection.byName(${name}) != null`;
 // Build query that uses the previous var and sub-query
 exports.faunaFetch = async () => {
  const respuesta = await  client.query(
    q.Create(q.Collection('UsuariosBuenos'), { data: { netlifyID: 'testValue' , stripeID: 'Testeo' } })
  );
  alert(respuesta);

    /*const upsertCollectionQuery = fql`
    if (${collectionExists(collectionName)}) {
      "Collection already exists"
    } else {
      Collection.create({ name: ${collectionName} })
      "Collection created"
    }
    `;
    // Run the query
    const response = await client.query(upsertCollectionQuery);
    console.log(response.data);

    client.close();*/
 }



exports.faunaFetch2 = async ({ query, variables }) => {


  

  /*client.query(
    q.Collection('UsuariosBuenos')
  )
  .then((res) => res.json())
  .catch(function (err) { console.log('Error:', err) });*/

  /*q.If(
    q.Exists(q.Collection('Todos')),
    null,
    q.CreateCollection({ name: 'Todos' }));*/

  /*return await fetch('https://db.eu.fauna.com/', { //https://graphql.eu.fauna.com/graphql
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY_V10}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(JSON.stringify(err, null, 2)));*/
};

