import { herkunft_sums_max_fieldsModelBase } from "./herkunft_sums_max_fieldsModel.base"


/* A graphql query fragment builders for herkunft_sums_max_fieldsModel */
export { selectFromherkunft_sums_max_fields, herkunft_sums_max_fieldsModelPrimitives, herkunft_sums_max_fieldsModelSelector } from "./herkunft_sums_max_fieldsModel.base"

/**
 * herkunft_sums_max_fieldsModel
 *
 * aggregate max on columns
 */
export const herkunft_sums_max_fieldsModel = herkunft_sums_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
