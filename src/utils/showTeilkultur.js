import getUserPersonOption from './getUserPersonOption'

const showTeilkultur = async ({ user, db }) => {
  const userPersonOption = await getUserPersonOption({ user, db })
  return userPersonOption?.tree_teilkultur
}

export default showTeilkultur
