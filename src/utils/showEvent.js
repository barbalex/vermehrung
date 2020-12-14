import getUserPersonOption from './getUserPersonOption'

const showEvent = async ({ user, db }) => {
  const userPersonOption = await getUserPersonOption({ user, db })
  return userPersonOption?.tree_event
}

export default showEvent
