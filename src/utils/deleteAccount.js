import axios from 'redaxios'

import {
  store,
  addNotification,
  onlineAtom,
  shortTermOnlineAtom,
  setOnline,
  setShortTermOnline,
} from '../store/index.js'
import { constants } from './constants.js'

export const deleteAccount = async ({ person }) => {
  const online = store.get(onlineAtom)
  const shortTermOnline = store.get(shortTermOnlineAtom)
  // delete firebase user
  if (person?.account_id) {
    try {
      await axios.get(`${constants?.authUri}/delete-user/${person?.account_id}`)
    } catch (error) {
      console.log(error)
      if (online) {
        setOnline(false)
      }
      if (shortTermOnline) {
        setShortTermOnline(false)
      }
      return addNotification({
        message: error.response.data,
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
      message: `Keine Person mit id ${person.id} gefunden`,
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
