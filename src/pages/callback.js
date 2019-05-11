// see: https://auth0.com/blog/securing-gatsby-with-auth0/
import React, { useContext } from 'react'

import { handleAuthentication } from '../utils/auth'
import storeContext from '../storeContext'

const Callback = () => {
  const store = useContext(storeContext)
  handleAuthentication(store)

  return <p>Lade...</p>
}

export default Callback
