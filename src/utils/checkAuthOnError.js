import getAuthToken from './getAuthToken'

const checkAuthOnError = ({ error, store }) => {
  if (error.message.includes('JWTExpired')) {
    console.log('JWT expired, will re-set')
    getAuthToken({ store })
  }
}

export default checkAuthOnError
