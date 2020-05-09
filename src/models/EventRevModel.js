import { EventRevModelBase } from "./EventRevModel.base"


/* A graphql query fragment builders for EventRevModel */
export { selectFromEventRev, eventRevModelPrimitives, EventRevModelSelector } from "./EventRevModel.base"

/**
 * EventRevModel
 *
 * columns and relationships of "event_rev"
 */
export const EventRevModel = EventRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
