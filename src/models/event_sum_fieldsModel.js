import { event_sum_fieldsModelBase } from "./event_sum_fieldsModel.base"


/* A graphql query fragment builders for event_sum_fieldsModel */
export { selectFromevent_sum_fields, event_sum_fieldsModelPrimitives, event_sum_fieldsModelSelector } from "./event_sum_fieldsModel.base"

/**
 * event_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const event_sum_fieldsModel = event_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
