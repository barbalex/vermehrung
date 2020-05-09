import { EventVarPopFieldsModelBase } from "./EventVarPopFieldsModel.base"


/* A graphql query fragment builders for EventVarPopFieldsModel */
export { selectFromEventVarPopFields, eventVarPopFieldsModelPrimitives, EventVarPopFieldsModelSelector } from "./EventVarPopFieldsModel.base"

/**
 * EventVarPopFieldsModel
 *
 * aggregate var_pop on columns
 */
export const EventVarPopFieldsModel = EventVarPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
