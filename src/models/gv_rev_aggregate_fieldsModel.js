import { gv_rev_aggregate_fieldsModelBase } from "./gv_rev_aggregate_fieldsModel.base"


/* A graphql query fragment builders for gv_rev_aggregate_fieldsModel */
export { selectFromgv_rev_aggregate_fields, gv_rev_aggregate_fieldsModelPrimitives, gv_rev_aggregate_fieldsModelSelector } from "./gv_rev_aggregate_fieldsModel.base"

/**
 * gv_rev_aggregate_fieldsModel
 */
export const gv_rev_aggregate_fieldsModel = gv_rev_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
