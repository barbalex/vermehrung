import { ae_art_aggregate_fieldsModelBase } from "./ae_art_aggregate_fieldsModel.base"


/* A graphql query fragment builders for ae_art_aggregate_fieldsModel */
export { selectFromae_art_aggregate_fields, ae_art_aggregate_fieldsModelPrimitives, ae_art_aggregate_fieldsModelSelector } from "./ae_art_aggregate_fieldsModel.base"

/**
 * ae_art_aggregate_fieldsModel
 *
 * aggregate fields of "ae_art"
 */
export const ae_art_aggregate_fieldsModel = ae_art_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
