import { EventRevVarPopFieldsModelBase } from "./EventRevVarPopFieldsModel.base"


/* A graphql query fragment builders for EventRevVarPopFieldsModel */
export { selectFromEventRevVarPopFields, eventRevVarPopFieldsModelPrimitives, EventRevVarPopFieldsModelSelector } from "./EventRevVarPopFieldsModel.base"

/**
 * EventRevVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const EventRevVarPopFieldsModel = EventRevVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
