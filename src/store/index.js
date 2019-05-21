import { types } from 'mobx-state-tree'
import uniqBy from 'lodash/uniqBy'

import Tree, { defaultValue as defaultTree } from './Tree'
import Filter from './Filter/types'
import initialFilterValues from './Filter/initialValues'
import { action } from 'mobx'

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
  })
  // structure of these variables is not controlled
  // so need to define this as volatile
  .volatile(() => ({
    errors: [],
    auth0Users: [],
    auth0ManagementToken: '',
    notifications: [],
  }))
  .actions(self => ({
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
      console.log('Store, removeNotification, note:', note)
      self.notifications = self.notifications.filter(n => n.key !== note)
    },
    setAuth0Users(users) {
      self.auth0Users = users
    },
    setAuth0ManagementToken(token) {
      self.auth0ManagementToken = token
    },
    setTechnDokuFilter(val) {
      self.technDokuFilter = val
    },
    setBenutzerDokuFilter(val) {
      self.benutzerDokuFilter = val
    },
    addError(error) {
      // cannnot pop, need to set new value
      // or the change will not be observed
      // use uniq in case multiple same messages arrive
      self.errors = uniqBy([...self.errors, error], 'message')
      setTimeout(() => {
        // need to use an action inside timeout
        self.popError()
      }, 1000 * 10)
    },
    popError() {
      // eslint-disable-next-line no-unused-vars
      const [first, ...last] = self.errors
      self.errors = [...last]
    },
  }))

export default myTypes
