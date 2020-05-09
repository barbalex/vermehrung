import { garten_var_samp_fieldsModelBase } from "./garten_var_samp_fieldsModel.base"


/* A graphql query fragment builders for garten_var_samp_fieldsModel */
export { selectFromgarten_var_samp_fields, garten_var_samp_fieldsModelPrimitives, garten_var_samp_fieldsModelSelector } from "./garten_var_samp_fieldsModel.base"

/**
 * garten_var_samp_fieldsModel
 *
 * aggregate var_samp on columns
 */
export const garten_var_samp_fieldsModel = garten_var_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
