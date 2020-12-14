import getUserPersonOption from './getUserPersonOption'

const showZaehlung = async ({ user, db }) => {
  const userPersonOption = await getUserPersonOption({ user, db })
  return userPersonOption?.tree_zaehlung
}

export default showZaehlung
