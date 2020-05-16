import { types } from 'mobx-state-tree'
import { reaction, flow } from 'mobx'

import { herkunftModelBase } from './herkunftModel.base'

/* A graphql query fragment builders for herkunftModel */
export {
  selectFromherkunft,
  herkunftModelPrimitives,
  herkunftModelSelector,
} from './herkunftModel.base'

/**
 * herkunftModel
 */
export const herkunftModel = herkunftModelBase
  .props({
    nr: types.union(types.undefined, types.null, types.integer, types.string),
  })
  .actions((self) => {
    /*reaction(
      () => self._conflicts,
      () => {
        // TODO: Can we detect when a conflict arrives and query it?
        if (self._conflicts.length) {
          console.log('CONFLICT detected:', self._conflicts)
        }
      },
    )*/
    return {
      // This is an auto-generated example action.
      log() {
        console.log(JSON.stringify(self))
      },
    }
  })
