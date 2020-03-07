var express = require('express')
var firebaseRouter = express.Router()
// see: https://firebase.google.com/docs/auth/admin/manage-users
var admin = require('firebase-admin')
const postgres = require('postgres')

var serviceAccount = require('./config.js')
console.log(
  'HASURA_GRAPHQL_DATABASE_URL:',
  process.env.HASURA_GRAPHQL_DATABASE_URL,
)
console.log('serviceAccount:', serviceAccount)
const sql = postgres(process.env.HASURA_GRAPHQL_DATABASE_URL)

var error = null
// Initialize the Firebase admin SDK with your service account credentials
if (serviceAccount) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount)),
    })
  } catch (e) {
    error = e
  }
}

firebaseRouter.route('/webhook').get((request, response) => {
  console.log('request:', request)
  // Throw 500 if firebase is not configured
  if (!serviceAccount) {
    response.status(500).send('Firebase not configured')
    return
  }
  // Check for errors initializing firebase SDK
  if (error) {
    response.status(500).send('Invalid firebase configuration')
    return
  }
  // Get authorization headers
  var authHeaders = request.get('Authorization')
  // Send anonymous role if there are no auth headers
  if (!authHeaders) {
    response.json({ 'x-hasura-role': 'anonymous' })
    return
  } else {
    // Validate the received id_token
    var idToken = extractToken(authHeaders)
    console.log(idToken)
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const { uid } = decodedToken
        sql`select * from person where account_id = '${uid}'`
          .then(persons => {
            console.log('persons:', persons)
            if (!persons) {
              return response.json({ 'x-hasura-role': 'anonymous' })
            }
            const person = persons[0]
            if (!person) {
              return response.json({ 'x-hasura-role': 'anonymous' })
            }
            const { id, user_role } = person
            if (!id) {
              return response.json({ 'x-hasura-role': 'anonymous' })
            }
            if (!user_role) {
              return response.json({ 'x-hasura-role': 'anonymous' })
            }
            // TODO:
            // call db, extract userId and role for this email
            // then return
            var hasuraVariables = {
              'x-hasura-default-role': user_role,
              'x-hasura-role': user_role,
              'x-hasura-allowed-roles': user_role,
              'x-hasura-user-id': id,
            }
            //console.log(hasuraVariables) // For debug
            // Send appropriate variables
            response.json(hasuraVariables)
          })
          .catch(() => response.json({ 'x-hasura-role': 'anonymous' }))
      })
      .catch(e => {
        // Throw authentication error
        console.log(e)
        response.json({ 'x-hasura-role': 'anonymous' })
      })
  }
})

const extractToken = bearerToken => {
  const regex = /^(Bearer) (.*)$/g
  const match = regex.exec(bearerToken)
  if (match && match[2]) {
    return match[2]
  }
  return null
}

module.exports = firebaseRouter
