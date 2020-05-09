import { event_rev_aggregateModelBase } from "./event_rev_aggregateModel.base"


/* A graphql query fragment builders for event_rev_aggregateModel */
export { selectFromevent_rev_aggregate, event_rev_aggregateModelPrimitives, event_rev_aggregateModelSelector } from "./event_rev_aggregateModel.base"

/**
 * event_rev_aggregateModel
 *
 * aggregated selection of "event_rev"
 */
export const event_rev_aggregateModel = event_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
