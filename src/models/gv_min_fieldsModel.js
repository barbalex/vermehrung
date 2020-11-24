import { gv_min_fieldsModelBase } from "./gv_min_fieldsModel.base"


/* A graphql query fragment builders for gv_min_fieldsModel */
export { selectFromgv_min_fields, gv_min_fieldsModelPrimitives, gv_min_fieldsModelSelector } from "./gv_min_fieldsModel.base"

/**
 * gv_min_fieldsModel
 */
export const gv_min_fieldsModel = gv_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
