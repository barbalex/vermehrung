import axios from 'redaxios'

import getConstants from './constants'

const constants = getConstants()

const deleteAccount = async ({ store, person }) => {
  const { addNotification, online, setOnline } = store
  // delete firebase user
  if (person?.account_id) {
    try {
      await axios.get(`${constants?.authUri}/delete-user/${person?.account_id}`)
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

export default deleteAccount
