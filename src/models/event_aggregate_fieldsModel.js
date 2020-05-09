import { event_aggregate_fieldsModelBase } from "./event_aggregate_fieldsModel.base"


/* A graphql query fragment builders for event_aggregate_fieldsModel */
export { selectFromevent_aggregate_fields, event_aggregate_fieldsModelPrimitives, event_aggregate_fieldsModelSelector } from "./event_aggregate_fieldsModel.base"

/**
 * event_aggregate_fieldsModel
 *
 * aggregate fields of "event"
 */
export const event_aggregate_fieldsModel = event_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
