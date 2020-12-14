import getUserPersonOption from './getUserPersonOption'

const showLieferung = async ({ user, db }) => {
  const userPersonOption = await getUserPersonOption({ user, db })
  return userPersonOption?.tree_lieferung
}

export default showLieferung
