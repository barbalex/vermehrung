import { person_var_samp_fieldsModelBase } from "./person_var_samp_fieldsModel.base"


/* A graphql query fragment builders for person_var_samp_fieldsModel */
export { selectFromperson_var_samp_fields, person_var_samp_fieldsModelPrimitives, person_var_samp_fieldsModelSelector } from "./person_var_samp_fieldsModel.base"

/**
 * person_var_samp_fieldsModel
 *
 * aggregate var_samp on columns
 */
export const person_var_samp_fieldsModel = person_var_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
