import getUserPersonOption from './getUserPersonOption'

const showKultur = async ({ user, db }) => {
  const userPersonOption = await getUserPersonOption({ user, db })

  return userPersonOption?.tree_kultur
}

export default showKultur
