import { gv_max_fieldsModelBase } from "./gv_max_fieldsModel.base"


/* A graphql query fragment builders for gv_max_fieldsModel */
export { selectFromgv_max_fields, gv_max_fieldsModelPrimitives, gv_max_fieldsModelSelector } from "./gv_max_fieldsModel.base"

/**
 * gv_max_fieldsModel
 */
export const gv_max_fieldsModel = gv_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
