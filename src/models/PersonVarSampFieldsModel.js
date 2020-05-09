import { PersonVarSampFieldsModelBase } from "./PersonVarSampFieldsModel.base"


/* A graphql query fragment builders for PersonVarSampFieldsModel */
export { selectFromPersonVarSampFields, personVarSampFieldsModelPrimitives, PersonVarSampFieldsModelSelector } from "./PersonVarSampFieldsModel.base"

/**
 * PersonVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const PersonVarSampFieldsModel = PersonVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
