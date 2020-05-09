import { event_aggregateModelBase } from "./event_aggregateModel.base"


/* A graphql query fragment builders for event_aggregateModel */
export { selectFromevent_aggregate, event_aggregateModelPrimitives, event_aggregateModelSelector } from "./event_aggregateModel.base"

/**
 * event_aggregateModel
 *
 * aggregated selection of "event"
 */
export const event_aggregateModel = event_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
