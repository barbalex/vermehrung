import { art_sums_stddev_pop_fieldsModelBase } from "./art_sums_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for art_sums_stddev_pop_fieldsModel */
export { selectFromart_sums_stddev_pop_fields, art_sums_stddev_pop_fieldsModelPrimitives, art_sums_stddev_pop_fieldsModelSelector } from "./art_sums_stddev_pop_fieldsModel.base"

/**
 * art_sums_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const art_sums_stddev_pop_fieldsModel = art_sums_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
