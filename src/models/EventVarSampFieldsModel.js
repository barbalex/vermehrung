import { EventVarSampFieldsModelBase } from "./EventVarSampFieldsModel.base"


/* A graphql query fragment builders for EventVarSampFieldsModel */
export { selectFromEventVarSampFields, eventVarSampFieldsModelPrimitives, EventVarSampFieldsModelSelector } from "./EventVarSampFieldsModel.base"

/**
 * EventVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const EventVarSampFieldsModel = EventVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
