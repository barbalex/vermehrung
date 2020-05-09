import { PersonOptionRevVarSampFieldsModelBase } from "./PersonOptionRevVarSampFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevVarSampFieldsModel */
export { selectFromPersonOptionRevVarSampFields, personOptionRevVarSampFieldsModelPrimitives, PersonOptionRevVarSampFieldsModelSelector } from "./PersonOptionRevVarSampFieldsModel.base"

/**
 * PersonOptionRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const PersonOptionRevVarSampFieldsModel = PersonOptionRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
