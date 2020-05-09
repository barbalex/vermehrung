import { PersonRevVarSampFieldsModelBase } from "./PersonRevVarSampFieldsModel.base"


/* A graphql query fragment builders for PersonRevVarSampFieldsModel */
export { selectFromPersonRevVarSampFields, personRevVarSampFieldsModelPrimitives, PersonRevVarSampFieldsModelSelector } from "./PersonRevVarSampFieldsModel.base"

/**
 * PersonRevVarSampFieldsModel
 *
 * aggregate var_samp on columns
 */
export const PersonRevVarSampFieldsModel = PersonRevVarSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
