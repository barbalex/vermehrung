/**
 * Not in use due to cors issue
 */

import md5 from 'blueimp-md5'

const uploadcareApiSignature = ({ verb, uri }) => {
  if (!verb || !uri) return
  const secret = import.meta.env.UPLOADCARE_SECRET_KEY
  // seems that we are sending an empty string?
  const contentMd5 = md5('')
  const contentType = 'application/json'
  const date = new window.Date().toISOString()
  const signString = [verb, contentMd5, contentType, date, uri].join('\n')
  return md5(secret + signString)
}

export default uploadcareApiSignature
