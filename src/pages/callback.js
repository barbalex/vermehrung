// see: https://auth0.com/blog/securing-gatsby-with-auth0/
import React from 'react'
import { handleAuthentication } from '../utils/auth'

const Callback = () => {
  handleAuthentication()

  return <p>Lade...</p>
}

export default Callback
