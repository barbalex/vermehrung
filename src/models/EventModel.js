import { eventModelBase } from "./eventModel.base"


/* A graphql query fragment builders for eventModel */
export { selectFromevent, eventModelPrimitives, eventModelSelector } from "./eventModel.base"

/**
 * eventModel
 *
 * columns and relationships of "event"
 */
export const eventModel = eventModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
