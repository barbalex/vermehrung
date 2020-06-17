import { gv_var_pop_fieldsModelBase } from "./gv_var_pop_fieldsModel.base"


/* A graphql query fragment builders for gv_var_pop_fieldsModel */
export { selectFromgv_var_pop_fields, gv_var_pop_fieldsModelPrimitives, gv_var_pop_fieldsModelSelector } from "./gv_var_pop_fieldsModel.base"

/**
 * gv_var_pop_fieldsModel
 */
export const gv_var_pop_fieldsModel = gv_var_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
