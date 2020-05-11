import { event_min_fieldsModelBase } from "./event_min_fieldsModel.base"


/* A graphql query fragment builders for event_min_fieldsModel */
export { selectFromevent_min_fields, event_min_fieldsModelPrimitives, event_min_fieldsModelSelector } from "./event_min_fieldsModel.base"

/**
 * event_min_fieldsModel
 *
 * aggregate min on columns
 */
export const event_min_fieldsModel = event_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
