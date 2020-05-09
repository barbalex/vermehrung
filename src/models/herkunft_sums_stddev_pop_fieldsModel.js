import { herkunft_sums_stddev_pop_fieldsModelBase } from "./herkunft_sums_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for herkunft_sums_stddev_pop_fieldsModel */
export { selectFromherkunft_sums_stddev_pop_fields, herkunft_sums_stddev_pop_fieldsModelPrimitives, herkunft_sums_stddev_pop_fieldsModelSelector } from "./herkunft_sums_stddev_pop_fieldsModel.base"

/**
 * herkunft_sums_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const herkunft_sums_stddev_pop_fieldsModel = herkunft_sums_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
