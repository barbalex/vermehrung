import { types } from 'mobx-state-tree'

export default types.model('Auth', {
  email: types.optional(types.string, ''),
  signupOpen: types.optional(types.boolean, false),
  loginOpen: types.optional(types.boolean, false),
})

export const defaultValue = {
  email: '',
  signupOpen: false,
  loginOpen: false,
}
