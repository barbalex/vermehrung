import axios from 'redaxios'

import getConstants from './constants'

const constants = getConstants()

const signup = async ({ person, store }) => {
  const { addNotification, online, setOnline } = store

  // fetch email of this person
  const email = person?.email
  if (!email) {
    return addNotification({
      message: 'Eine email-Adresse muss erfasst sein',
      type: 'warning',
    })
  }
  const userRole = person?.user_role
  if (!userRole) {
    return addNotification({
      message: 'Eine Rolle muss erfasst sein',
      type: 'warning',
    })
  }
  let res
  try {
    res = await axios.get(`${constants?.authUri}/create-user/${email}`)
  } catch (error) {
    console.log(error)
    if (online) {
      setOnline(false)
    }
    return addNotification({
      message: error.response.data,
    })
  }
  if (!online) {
    setOnline(true)
  }
  store.addNotification({
    message: `Für ${email} wurde ein Konto erstellt`,
    type: 'success',
  })
  if (!person) {
    return addNotification({
      message: `Keine Person mit id ${person.id} gefunden`,
    })
  }
  person.edit({ field: 'account_id', value: res.data })
}

export default signup
