import {
  store,
  addNotification,
  onlineAtom,
  setOnline,
} from '../store/index.ts'
import { constants } from './constants.ts'
import { fetchWithTimeout } from './fetchWithTimeout.ts'
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
  let data: string
  try {
    const res = await fetchWithTimeout(
      `${constants?.getAuthUri()}/create-user/${email}`,
    )
    data = await res.text()
    // like axios, treat non-2xx as an error and surface the body
    if (!res.ok) throw new Error(data || res.statusText)
  } catch (error) {
    if (online) {
      setOnline(false)
    }
    return addNotification({
      message: (error as Error).message || 'Oh je. Da ging was schief',
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
  person.edit({ field: 'account_id', value: data })
}
