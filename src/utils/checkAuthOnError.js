import getAuthToken from './getAuthToken'

export default ({ error, store }) => {
  if (error.message.includes('JWTExpired')) {
    console.log('TreeContainer, JWT expired, will re-set')
    getAuthToken({ store })
  }
}
