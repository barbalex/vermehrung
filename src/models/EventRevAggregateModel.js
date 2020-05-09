import { EventRevAggregateModelBase } from "./EventRevAggregateModel.base"


/* A graphql query fragment builders for EventRevAggregateModel */
export { selectFromEventRevAggregate, eventRevAggregateModelPrimitives, EventRevAggregateModelSelector } from "./EventRevAggregateModel.base"

/**
 * EventRevAggregateModel
 *
 * aggregated selection of "event_rev"
 */
export const EventRevAggregateModel = EventRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
