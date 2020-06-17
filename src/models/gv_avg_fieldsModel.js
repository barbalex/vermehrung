import { gv_avg_fieldsModelBase } from "./gv_avg_fieldsModel.base"


/* A graphql query fragment builders for gv_avg_fieldsModel */
export { selectFromgv_avg_fields, gv_avg_fieldsModelPrimitives, gv_avg_fieldsModelSelector } from "./gv_avg_fieldsModel.base"

/**
 * gv_avg_fieldsModel
 */
export const gv_avg_fieldsModel = gv_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
