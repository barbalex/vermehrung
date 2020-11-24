import { event_avg_fieldsModelBase } from "./event_avg_fieldsModel.base"


/* A graphql query fragment builders for event_avg_fieldsModel */
export { selectFromevent_avg_fields, event_avg_fieldsModelPrimitives, event_avg_fieldsModelSelector } from "./event_avg_fieldsModel.base"

/**
 * event_avg_fieldsModel
 */
export const event_avg_fieldsModel = event_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
