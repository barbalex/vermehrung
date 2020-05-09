import { EventAggregateModelBase } from "./EventAggregateModel.base"


/* A graphql query fragment builders for EventAggregateModel */
export { selectFromEventAggregate, eventAggregateModelPrimitives, EventAggregateModelSelector } from "./EventAggregateModel.base"

/**
 * EventAggregateModel
 *
 * aggregated selection of "event"
 */
export const EventAggregateModel = EventAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
