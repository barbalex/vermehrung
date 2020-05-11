import { garten_stddev_samp_fieldsModelBase } from "./garten_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for garten_stddev_samp_fieldsModel */
export { selectFromgarten_stddev_samp_fields, garten_stddev_samp_fieldsModelPrimitives, garten_stddev_samp_fieldsModelSelector } from "./garten_stddev_samp_fieldsModel.base"

/**
 * garten_stddev_samp_fieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const garten_stddev_samp_fieldsModel = garten_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
