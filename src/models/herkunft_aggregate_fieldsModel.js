import { herkunft_aggregate_fieldsModelBase } from "./herkunft_aggregate_fieldsModel.base"


/* A graphql query fragment builders for herkunft_aggregate_fieldsModel */
export { selectFromherkunft_aggregate_fields, herkunft_aggregate_fieldsModelPrimitives, herkunft_aggregate_fieldsModelSelector } from "./herkunft_aggregate_fieldsModel.base"

/**
 * herkunft_aggregate_fieldsModel
 *
 * aggregate fields of "herkunft"
 */
export const herkunft_aggregate_fieldsModel = herkunft_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
