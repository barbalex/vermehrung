import { Q } from '@nozbe/watermelondb'

const getUserPerson = async ({ user, db }) => {
  const userPersons = user.uid
    ? await db.collections
        .get('person')
        .query(Q.where('account_id', user.uid))
        .fetch()
    : []
  const userPerson = userPersons[0]
  return userPerson
}

export default getUserPerson
