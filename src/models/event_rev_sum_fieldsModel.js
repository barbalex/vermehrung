import { event_rev_sum_fieldsModelBase } from "./event_rev_sum_fieldsModel.base"


/* A graphql query fragment builders for event_rev_sum_fieldsModel */
export { selectFromevent_rev_sum_fields, event_rev_sum_fieldsModelPrimitives, event_rev_sum_fieldsModelSelector } from "./event_rev_sum_fieldsModel.base"

/**
 * event_rev_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const event_rev_sum_fieldsModel = event_rev_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
