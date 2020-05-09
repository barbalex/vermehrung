import { PersonOptionVarSampFieldsModelBase } from "./PersonOptionVarSampFieldsModel.base"


/* A graphql query fragment builders for PersonOptionVarSampFieldsModel */
export { selectFromPersonOptionVarSampFields, personOptionVarSampFieldsModelPrimitives, PersonOptionVarSampFieldsModelSelector } from "./PersonOptionVarSampFieldsModel.base"

/**
 * PersonOptionVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const PersonOptionVarSampFieldsModel = PersonOptionVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
