import { art_stddev_samp_fieldsModelBase } from "./art_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for art_stddev_samp_fieldsModel */
export { selectFromart_stddev_samp_fields, art_stddev_samp_fieldsModelPrimitives, art_stddev_samp_fieldsModelSelector } from "./art_stddev_samp_fieldsModel.base"

/**
 * art_stddev_samp_fieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const art_stddev_samp_fieldsModel = art_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
