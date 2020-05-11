import { event_rev_variance_fieldsModelBase } from "./event_rev_variance_fieldsModel.base"


/* A graphql query fragment builders for event_rev_variance_fieldsModel */
export { selectFromevent_rev_variance_fields, event_rev_variance_fieldsModelPrimitives, event_rev_variance_fieldsModelSelector } from "./event_rev_variance_fieldsModel.base"

/**
 * event_rev_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const event_rev_variance_fieldsModel = event_rev_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
