import { herkunft_sums_stddev_fieldsModelBase } from "./herkunft_sums_stddev_fieldsModel.base"


/* A graphql query fragment builders for herkunft_sums_stddev_fieldsModel */
export { selectFromherkunft_sums_stddev_fields, herkunft_sums_stddev_fieldsModelPrimitives, herkunft_sums_stddev_fieldsModelSelector } from "./herkunft_sums_stddev_fieldsModel.base"

/**
 * herkunft_sums_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const herkunft_sums_stddev_fieldsModel = herkunft_sums_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
