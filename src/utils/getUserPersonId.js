import { getProfile } from './auth'

export default () => {
  const user = getProfile()
  return user['https://hasura.io/jwt/claims']['x-hasura-user-id'] || 99999999
}
