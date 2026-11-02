import {
  store,
  addNotification,
  onlineAtom,
  shortTermOnlineAtom,
  setOnline,
  setShortTermOnline,
} from '../store/index.ts'
import { constants } from './constants.ts'
import { fetchWithTimeout } from './fetchWithTimeout.ts'
import type { Person } from '../dbModel.ts'

export const deleteAccount = async ({ person }: { person: Person | null }) => {
  const online = store.get(onlineAtom)
  const shortTermOnline = store.get(shortTermOnlineAtom)
  // delete firebase user
  if (person?.account_id) {
    try {
      const res = await fetchWithTimeout(
        `${constants?.getAuthUri()}/delete-user/${person?.account_id}`,
      )
      // like axios, treat non-2xx as an error and surface the body
      if (!res.ok) throw new Error((await res.text()) || res.statusText)
    } catch (error) {
      console.log(error)
      if (online) {
        setOnline(false)
      }
      if (shortTermOnline) {
        setShortTermOnline(false)
      }
      return addNotification({
        message: (error as Error).message || 'Fehler',
      })
    }
    if (!online) {
      setOnline(true)
    }
    if (!shortTermOnline) {
      setShortTermOnline(true)
    }
  }
  if (!person) {
    return addNotification({
      message: 'Keine Person gefunden',
    })
  }
  // remove users account_id
  // but only if it exists
  if (person?.account_id) {
    person.edit({ field: 'account_id', value: null })
    return addNotification({
      message: `Das Benutzerkonto wurde entfernt`,
      type: 'info',
    })
  }
}
