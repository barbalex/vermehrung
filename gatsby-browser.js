/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import React from 'react'

import App from './src/App'

/**
 * Am importing App because
 * need to pass App db state
 * as db needs to be created async
 */
export const wrapRootElement = ({ element }) => <App element={element} />

// https://github.com/gatsbyjs/gatsby/issues/9087#issuecomment-459105021
export const onServiceWorkerUpdateReady = () => {
  // ensure this happens _after_ app.js ataches store to window
  // did not work: Uncaught TypeError: Cannot read property 'setUpdateExists' of undefined
  setTimeout(() => window.store.setUpdateExists(true))
  /*if (
    window.confirm(
      'vermehrung neu laden, um die neuste Version zu installieren?',
    )
  ) {
    window.location.reload(true)
  }*/
}
