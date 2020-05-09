import { art_sums_aggregate_fieldsModelBase } from "./art_sums_aggregate_fieldsModel.base"


/* A graphql query fragment builders for art_sums_aggregate_fieldsModel */
export { selectFromart_sums_aggregate_fields, art_sums_aggregate_fieldsModelPrimitives, art_sums_aggregate_fieldsModelSelector } from "./art_sums_aggregate_fieldsModel.base"

/**
 * art_sums_aggregate_fieldsModel
 *
 * aggregate fields of "art_sums"
 */
export const art_sums_aggregate_fieldsModel = art_sums_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
