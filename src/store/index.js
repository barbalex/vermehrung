import { types } from 'mobx-state-tree'

import Tree, { defaultValue as defaultTree } from './Tree'
import Filter from './Filter/types'
import initialFilterValues from './Filter/initialValues'

const myTypes = types
  .model({
    tree: types.optional(Tree, defaultTree),
    filter: types.optional(Filter, initialFilterValues),
    technDokuFilter: types.optional(
      types.union(types.string, types.number),
      '',
    ),
    benutzerDokuFilter: types.optional(
      types.union(types.string, types.number),
      '',
    ),
    hideInactive: types.optional(types.maybeNull(types.boolean), true),
  })
  // structure of these variables is not controlled
  // so need to define this as volatile
  .volatile(() => ({
    auth0Users: [],
    auth0Token: '',
    auth0ManagementToken: '',
    notifications: [],
  }))
  .actions(self => ({
    setHideInactive(val) {
      self.hideInactive = val
      // TODO:
      // set filters for person,garten,sammlung
      const key = 'aktiv'
      const value = val
      self.filter.setValue({ table: 'person', key, value })
      self.filter.setValue({ table: 'garten', key, value })
      self.filter.setValue({ table: 'kultur', key, value })
    },
    enqueNotification(note) {
      self.notifications = [
        ...self.notifications,
        {
          key: new Date().getTime() + Math.random(),
          ...note,
        },
      ]
    },
    removeNotification(note) {
      self.notifications = self.notifications.filter(n => n.key !== note)
    },
    setAuth0Users(users) {
      self.auth0Users = users
    },
    setAuth0ManagementToken(token) {
      self.auth0ManagementToken = token
    },
    setAuth0Token(token) {
      self.auth0Token = token
    },
    setTechnDokuFilter(val) {
      self.technDokuFilter = val
    },
    setBenutzerDokuFilter(val) {
      self.benutzerDokuFilter = val
    },
  }))

export default myTypes
