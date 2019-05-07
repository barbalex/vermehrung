import React from 'react'
import { handleAuthentication } from '../utils/auth'

const Callback = () => {
  handleAuthentication()

  return <p>Lade...</p>
}

export default Callback
