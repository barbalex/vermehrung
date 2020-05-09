import { EventRevVarSampFieldsModelBase } from "./EventRevVarSampFieldsModel.base"


/* A graphql query fragment builders for EventRevVarSampFieldsModel */
export { selectFromEventRevVarSampFields, eventRevVarSampFieldsModelPrimitives, EventRevVarSampFieldsModelSelector } from "./EventRevVarSampFieldsModel.base"

/**
 * EventRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const EventRevVarSampFieldsModel = EventRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
