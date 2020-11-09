/**
 * Not in use due to cors issue
 */

import md5Hex from 'md5-hex'

const uploadcareApiSignature = ({ verb, uri }) => {
  if (!verb || !uri) return
  const secret = process.env.UPLOADCARE_SECRET_KEY
  // seems that we are sending an empty string?
  const contentMd5 = md5Hex('')
  const contentType = 'application/json'
  const date = new window.Date().toISOString()
  const signString = [verb, contentMd5, contentType, date, uri].join('\n')
  return md5Hex(secret + signString)
}

export default uploadcareApiSignature
