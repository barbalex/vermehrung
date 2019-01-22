import { types } from 'mobx-state-tree'

import Auth, { defaultValue as defaultAuth } from './Auth'
import Tree, { defaultValue as defaultTree } from './Tree'

const myTypes = types.model({
  auth: types.optional(Auth, defaultAuth),
  tree: types.optional(Tree, defaultTree),
})

export default myTypes
