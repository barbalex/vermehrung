import { Q } from '@nozbe/watermelondb'

const getUserRole = async ({ user, db }) => {
  const userPersons = user.uid
    ? await db.collections
        .get('person')
        .query(Q.where('account_id', user.uid))
        .fetch()
    : []
  const userPerson = userPersons[0]
  const userRoleId = userPerson?.user_role_id
  const userRole = userRoleId
    ? await db.collections.get('user_role').find(userRoleId)
    : undefined
  return userRole?.name
}

export default getUserRole
