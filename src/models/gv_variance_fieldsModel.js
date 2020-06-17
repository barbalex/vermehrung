import { gv_variance_fieldsModelBase } from "./gv_variance_fieldsModel.base"


/* A graphql query fragment builders for gv_variance_fieldsModel */
export { selectFromgv_variance_fields, gv_variance_fieldsModelPrimitives, gv_variance_fieldsModelSelector } from "./gv_variance_fieldsModel.base"

/**
 * gv_variance_fieldsModel
 */
export const gv_variance_fieldsModel = gv_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
