import getUserPersonOption from './getUserPersonOption'

const showKultur = async ({ user, db }) => {
  const userPersonOption = await getUserPersonOption({ user, db })
  console.log('showKultur, userPersonOption:', userPersonOption)
  return userPersonOption?.tree_kultur
}

export default showKultur
