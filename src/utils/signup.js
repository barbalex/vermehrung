import axios from 'redaxios'

import {
  store,
  addNotification,
  onlineAtom,
  setOnline,
} from '../store/index.js'
import { constants } from './constants.js'

export const signup = async ({ person }) => {
  const online = store.get(onlineAtom)

  // fetch email of this person
  const email = person?.email
  if (!email) {
    return addNotification({
      message: 'Eine email-Adresse muss erfasst sein',
      type: 'warning',
    })
  }
  if (!person?.user_role_id) {
    return addNotification({
      message: 'Eine Rolle muss erfasst sein',
      type: 'warning',
    })
  }
  let res
  try {
    res = await axios.get(`${constants?.authUri}/create-user/${email}`)
  } catch (error) {
    if (online) {
      setOnline(false)
    }
    return addNotification({
      message: error?.response?.data ?? 'Oh je. Da ging was schief',
    })
  }
  if (!online) {
    setOnline(true)
  }
  addNotification({
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
