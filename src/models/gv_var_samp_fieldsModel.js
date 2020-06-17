import { gv_var_samp_fieldsModelBase } from "./gv_var_samp_fieldsModel.base"


/* A graphql query fragment builders for gv_var_samp_fieldsModel */
export { selectFromgv_var_samp_fields, gv_var_samp_fieldsModelPrimitives, gv_var_samp_fieldsModelSelector } from "./gv_var_samp_fieldsModel.base"

/**
 * gv_var_samp_fieldsModel
 */
export const gv_var_samp_fieldsModel = gv_var_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
