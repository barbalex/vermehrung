import axios from 'redaxios'

import {
  store,
  addNotification,
  onlineAtom,
  setOnline,
} from '../store/index.ts'
import { constants } from './constants.ts'
import type { Person } from '../dbModel.ts'

export const signup = async ({ person }: { person: Person | null }) => {
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
    res = await axios.get(`${constants?.getAuthUri()}/create-user/${email}`)
  } catch (error) {
    if (online) {
      setOnline(false)
    }
    return addNotification({
      message:
        (error as { response?: { data?: string } })?.response?.data ??
        'Oh je. Da ging was schief',
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
      message: 'Keine Person gefunden',
    })
  }
  person.edit({ field: 'account_id', value: res.data })
}
