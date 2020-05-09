import { art_aggregate_fieldsModelBase } from "./art_aggregate_fieldsModel.base"


/* A graphql query fragment builders for art_aggregate_fieldsModel */
export { selectFromart_aggregate_fields, art_aggregate_fieldsModelPrimitives, art_aggregate_fieldsModelSelector } from "./art_aggregate_fieldsModel.base"

/**
 * art_aggregate_fieldsModel
 *
 * aggregate fields of "art"
 */
export const art_aggregate_fieldsModel = art_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
