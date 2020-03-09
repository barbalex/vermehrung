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

app.get('/:uid', (req, res) => {
  console.log('you hit webhook with a get')
  const uid = req.params.uid
  console.log('req:', req)
  console.log('uid:', uid)
  // Throw 500 if firebase is not configured
  if (!serviceAccount) {
    res.status(500).send('Firebase not configured')
    return
  }
  // Check for errors initializing firebase SDK
  if (error) {
    return res.status(500).send('Invalid firebase configuration')
  }

  if (!uid) {
    return res.status(500).send('no user-uid was passed')
  }

  // fetch id and user_role
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

      admin
        .auth()
        .createCustomToken(uid, hasuraVariables)
        .then(customToken =>
          // Send token back to client
          res.send(customToken),
        )
        .catch(adminError =>
          res.status(500).send('Error creating custom token:', adminError),
        )
    })
    .catch(sqlError => res.status(500).send('Error querying db:', sqlError))
})

app.listen((port, host), () =>
  console.log(`app Running on http://${host}:${port}`),
)
