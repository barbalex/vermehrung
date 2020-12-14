import getUserPersonOption from './getUserPersonOption'

const showSammelLieferung = async ({ user, db }) => {
  const userPersonOption = await getUserPersonOption({ user, db })
  return userPersonOption?.tree_lieferung
}

export default showSammelLieferung
