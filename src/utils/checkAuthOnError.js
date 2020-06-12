import getAuthToken from './getAuthToken'

export default ({ error, store }) => {
  if (error.message.includes('JWTExpired')) {
    console.log('JWT expired, will re-set')
    getAuthToken({ store })
  }
}
