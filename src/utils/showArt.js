import getUserRole from './getUserRole'

const showArt = async ({ user, db }) => {
  const userRole = await getUserRole({ user, db })
  return userRole !== 'gaertner'
}

export default showArt
