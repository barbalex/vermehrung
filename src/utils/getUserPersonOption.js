import getUserPerson from './getUserPerson'

const getUserPersonOption = async ({ user, db }) => {
  const userPerson = await getUserPerson({ user, db })
  const userPersonOption = userPerson
    ? await userPerson.person_option?.fetch()
    : undefined

  return userPersonOption
}

export default getUserPersonOption
