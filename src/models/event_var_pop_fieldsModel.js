import { event_var_pop_fieldsModelBase } from "./event_var_pop_fieldsModel.base"


/* A graphql query fragment builders for event_var_pop_fieldsModel */
export { selectFromevent_var_pop_fields, event_var_pop_fieldsModelPrimitives, event_var_pop_fieldsModelSelector } from "./event_var_pop_fieldsModel.base"

/**
 * event_var_pop_fieldsModel
 *
 * aggregate var_pop on columns
 */
export const event_var_pop_fieldsModel = event_var_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
