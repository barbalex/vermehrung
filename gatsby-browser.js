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
  // turned off becaus updateExits was not reset if user simply restarted
  // instead of clicking on the button
  //setTimeout(() => window.store.setUpdateExists(true))
  if (
    window.confirm(
      'vermehrung.ch neu laden, um die neuste Version zu installieren?',
    )
  ) {
    window.location.reload(true)
  }
}
