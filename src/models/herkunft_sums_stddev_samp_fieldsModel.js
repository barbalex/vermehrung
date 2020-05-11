import { herkunft_sums_stddev_samp_fieldsModelBase } from "./herkunft_sums_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for herkunft_sums_stddev_samp_fieldsModel */
export { selectFromherkunft_sums_stddev_samp_fields, herkunft_sums_stddev_samp_fieldsModelPrimitives, herkunft_sums_stddev_samp_fieldsModelSelector } from "./herkunft_sums_stddev_samp_fieldsModel.base"

/**
 * herkunft_sums_stddev_samp_fieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const herkunft_sums_stddev_samp_fieldsModel = herkunft_sums_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
