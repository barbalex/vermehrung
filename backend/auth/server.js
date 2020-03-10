'use strict'
// see: https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

const Hapi = require('@hapi/hapi')
// see: https://firebase.google.com/docs/auth/admin/manage-users
const admin = require('firebase-admin')
const postgres = require('postgres')

const serviceAccount = require('./config.js')

const server = new Hapi.Server({
  host: '0.0.0.0',
  port: 7000,
})

const sql = postgres(process.env.HASURA_GRAPHQL_DATABASE_URL)

let firebaseInitializationError = null
// Initialize the Firebase admin SDK with your service account credentials
if (serviceAccount) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  } catch (e) {
    firebaseInitializationError = e
  }
}

async function start() {
  server.route({
    method: 'GET',
    path: '/{uid}',
    handler: async (req, h) => {
      //console.log('serviceAccount:', serviceAccount)
      // Throw 500 if firebase is not configured
      if (!serviceAccount) {
        return h.response('Firebase not configured').code(500)
      }
      // Check for errors initializing firebase SDK
      if (firebaseInitializationError) {
        console.log('firebaseInitializationError:', firebaseInitializationError)
        return h
          .response(
            `firebase initalization error: ${firebaseInitializationError.message}`,
          )
          .code(500)
      }

      const { uid } = req.params
      //console.log('uid:', uid)
      if (!uid) {
        return h.response('no uid was passed').code(500)
      }

      //console.log('will query now')
      // fetch id and user_role
      return sql`select * from person where account_id = ${uid}`
        .then(persons => {
          //console.log('persons from query result:', persons)
          if (!persons) {
            return h.response('Got no persons when querying db').code(500)
          }
          const person = persons[0]
          if (!person) {
            return h.response('Got no person when querying db').code(500)
          }
          const { id, user_role } = person
          if (!id) {
            return h.response('Got no person_id when querying db').code(500)
          }
          if (!user_role) {
            return h
              .response('Got no person-user_role when querying db')
              .code(500)
          }
          const hasuraVariables = {
            'https://hasura.io/jwt/claims': {
              'x-hasura-default-role': user_role,
              'x-hasura-allowed-roles': [user_role],
              // beware: hasura expects strings
              'x-hasura-user-id': `"${id}"`,
            },
          }

          return admin
            .auth()
            .setCustomUserClaims(uid, hasuraVariables)
            .then(() => {
              //console.log('customToken:', customToken)
              // Send token back to client
              return h.response('user role and id set').code(200)
            })
            .catch(adminError => {
              console.log('Error creating custom token:', adminError)
              h.response(
                `Error creating custom token: ${adminError.message}`,
              ).code(500)
            })
        })
        .catch(sqlError => {
          console.log('Error querying db:', sqlError)
          h.response(`Error querying db: ${sqlError.message}`).code(500)
        })
    },
  })
  await server.start()
  console.log('JSON-API-Server running at:', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

start()
