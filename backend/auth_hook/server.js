'use strict'
// see: https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

const express = require('express')
// see: https://firebase.google.com/docs/auth/admin/manage-users
const admin = require('firebase-admin')
const postgres = require('postgres')

const serviceAccount = require('./config.js')

const app = express()
const port = 7000
const host = '0.0.0.0'

/*console.log(
  'HASURA_GRAPHQL_DATABASE_URL:',
  process.env.HASURA_GRAPHQL_DATABASE_URL,
)
console.log('serviceAccount:', serviceAccount)*/
const sql = postgres(process.env.HASURA_GRAPHQL_DATABASE_URL)

let error = null
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

app.get('/', (req, res) => {
  res.send('you hit root')
})
app.get('/webhook', (req, res) => {
  res.send('you hit webhook with a get')
})
app.post('/webhook', (req, res) => {
  res.send('you hit webhook with a get')
})
app.post('/', (req, res) => {
  res.send('you hit webhook with a post')
  console.log('req:', req)
  // Throw 500 if firebase is not configured
  if (!serviceAccount) {
    res.status(500).send('Firebase not configured')
    return
  }
  // Check for errors initializing firebase SDK
  if (error) {
    res.status(500).send('Invalid firebase configuration')
    return
  }
  // Get authorization headers
  const authHeaders = req.get('Authorization')
  // Send anonymous role if there are no auth headers
  if (!authHeaders) {
    res.json({ 'x-hasura-role': 'anonymous' })
    return
  } else {
    // Validate the received id_token
    const idToken = extractToken(authHeaders)
    console.log('idToken:', idToken)
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        const { uid } = decodedToken
        sql`select * from person where account_id = '${uid}'`
          .then(persons => {
            console.log('persons:', persons)
            if (!persons) {
              return res.json({ 'x-hasura-role': 'anonymous' })
            }
            const person = persons[0]
            if (!person) {
              return res.json({ 'x-hasura-role': 'anonymous' })
            }
            const { id, user_role } = person
            if (!id) {
              return res.json({ 'x-hasura-role': 'anonymous' })
            }
            if (!user_role) {
              return res.json({ 'x-hasura-role': 'anonymous' })
            }
            const hasuraVariables = {
              'x-hasura-default-role': user_role,
              'x-hasura-role': user_role,
              'x-hasura-allowed-roles': user_role,
              'x-hasura-user-id': id,
            }
            //console.log(hasuraVariables) // For debug
            // Send appropriate variables
            res.json(hasuraVariables)
          })
          .catch(() => res.json({ 'x-hasura-role': 'anonymous' }))
      })
      .catch(e => {
        // Throw authentication error
        console.log(e)
        res.json({ 'x-hasura-role': 'anonymous' })
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

app.listen((port, host), () =>
  console.log(`app Running on http://${host}:${port}`),
)
