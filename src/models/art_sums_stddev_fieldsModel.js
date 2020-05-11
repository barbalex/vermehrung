import { art_sums_stddev_fieldsModelBase } from "./art_sums_stddev_fieldsModel.base"


/* A graphql query fragment builders for art_sums_stddev_fieldsModel */
export { selectFromart_sums_stddev_fields, art_sums_stddev_fieldsModelPrimitives, art_sums_stddev_fieldsModelSelector } from "./art_sums_stddev_fieldsModel.base"

/**
 * art_sums_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const art_sums_stddev_fieldsModel = art_sums_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
