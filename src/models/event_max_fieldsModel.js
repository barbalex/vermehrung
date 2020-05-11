import { event_max_fieldsModelBase } from "./event_max_fieldsModel.base"


/* A graphql query fragment builders for event_max_fieldsModel */
export { selectFromevent_max_fields, event_max_fieldsModelPrimitives, event_max_fieldsModelSelector } from "./event_max_fieldsModel.base"

/**
 * event_max_fieldsModel
 *
 * aggregate max on columns
 */
export const event_max_fieldsModel = event_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
