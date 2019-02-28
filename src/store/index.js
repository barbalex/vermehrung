import { types } from 'mobx-state-tree'

import Auth, { defaultValue as defaultAuth } from './Auth'
import Tree, { defaultValue as defaultTree } from './Tree'
import Filter from './Filter/types'
import initialFilterValues from './Filter/initialValues'

const myTypes = types.model({
  auth: types.optional(Auth, defaultAuth),
  tree: types.optional(Tree, defaultTree),
  filter: types.optional(Filter, initialFilterValues),
})

export default myTypes
