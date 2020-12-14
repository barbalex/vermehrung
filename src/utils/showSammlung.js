
import getUserRole from './getUserRole'

const showSammlung = async ({ user, db }) => {
  const userRole = await getUserRole({ user, db })
  return userRole !== 'gaertner'
}

export default showSammlung
