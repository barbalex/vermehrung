import { event_revModelBase } from "./event_revModel.base"


/* A graphql query fragment builders for event_revModel */
export { selectFromevent_rev, event_revModelPrimitives, event_revModelSelector } from "./event_revModel.base"

/**
 * event_revModel
 *
 * columns and relationships of "event_rev"
 */
export const event_revModel = event_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
