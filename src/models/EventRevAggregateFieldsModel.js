import { EventRevAggregateFieldsModelBase } from "./EventRevAggregateFieldsModel.base"


/* A graphql query fragment builders for EventRevAggregateFieldsModel */
export { selectFromEventRevAggregateFields, eventRevAggregateFieldsModelPrimitives, EventRevAggregateFieldsModelSelector } from "./EventRevAggregateFieldsModel.base"

/**
 * EventRevAggregateFieldsModel
 *
 * aggregate fields of "event_rev"
 */
export const EventRevAggregateFieldsModel = EventRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
