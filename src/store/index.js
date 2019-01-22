import { types } from 'mobx-state-tree'

import Auth, { defaultValue as defaultAuth } from './Auth'

const myTypes = types.model({
  auth: types.optional(Auth, defaultAuth),
})

export default myTypes
