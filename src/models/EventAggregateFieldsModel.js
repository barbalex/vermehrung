import { EventAggregateFieldsModelBase } from "./EventAggregateFieldsModel.base"


/* A graphql query fragment builders for EventAggregateFieldsModel */
export { selectFromEventAggregateFields, eventAggregateFieldsModelPrimitives, EventAggregateFieldsModelSelector } from "./EventAggregateFieldsModel.base"

/**
 * EventAggregateFieldsModel
 *
 * aggregate fields of "event"
 */
export const EventAggregateFieldsModel = EventAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
