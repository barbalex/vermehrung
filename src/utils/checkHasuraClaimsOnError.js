import setHasuraClaims from './setHasuraClaims'

export default ({ error, store }) => {
  if (error.message.includes('JWTExpired')) {
    console.log('TreeContainer, JWT expired, will re-set hasura claims')
    setHasuraClaims({ store, user: store.user })
  }
}
