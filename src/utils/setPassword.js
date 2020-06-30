import getConstants from './constants'

const constants = getConstants()

export default async ({ store, person }) => {
  const { addNotification, firebase } = store
  // fetch email of this person
  const email = person?.email
  try {
    await firebase.auth().sendPasswordResetEmail(email, {
      url: `${constants?.appUri}/Vermehrung`,
      handleCodeInApp: true,
    })
  } catch (error) {
    addNotification({
      message: error.message,
    })
  }
  store.addNotification({
    message: `${email} erhält einen Link, um ein Passwort zu setzen`,
    type: 'success',
  })
}
