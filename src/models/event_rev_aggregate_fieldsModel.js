import { event_rev_aggregate_fieldsModelBase } from "./event_rev_aggregate_fieldsModel.base"


/* A graphql query fragment builders for event_rev_aggregate_fieldsModel */
export { selectFromevent_rev_aggregate_fields, event_rev_aggregate_fieldsModelPrimitives, event_rev_aggregate_fieldsModelSelector } from "./event_rev_aggregate_fieldsModel.base"

/**
 * event_rev_aggregate_fieldsModel
 *
 * aggregate fields of "event_rev"
 */
export const event_rev_aggregate_fieldsModel = event_rev_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
