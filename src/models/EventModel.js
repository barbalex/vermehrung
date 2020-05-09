import { EventModelBase } from "./EventModel.base"


/* A graphql query fragment builders for EventModel */
export { selectFromEvent, eventModelPrimitives, EventModelSelector } from "./EventModel.base"

/**
 * EventModel
 *
 * columns and relationships of "event"
 */
export const EventModel = EventModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
