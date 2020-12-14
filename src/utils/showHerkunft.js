import getUserRole from './getUserRole'

const showHerkunft = async ({ user, db }) => {
  const userRole = await getUserRole({ user, db })
  return userRole !== 'gaertner'
}

export default showHerkunft
