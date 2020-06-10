import { gv_aggregate_fieldsModelBase } from "./gv_aggregate_fieldsModel.base"


/* A graphql query fragment builders for gv_aggregate_fieldsModel */
export { selectFromgv_aggregate_fields, gv_aggregate_fieldsModelPrimitives, gv_aggregate_fieldsModelSelector } from "./gv_aggregate_fieldsModel.base"

/**
 * gv_aggregate_fieldsModel
 */
export const gv_aggregate_fieldsModel = gv_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
