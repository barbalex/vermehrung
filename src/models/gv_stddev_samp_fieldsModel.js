import { gv_stddev_samp_fieldsModelBase } from "./gv_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for gv_stddev_samp_fieldsModel */
export { selectFromgv_stddev_samp_fields, gv_stddev_samp_fieldsModelPrimitives, gv_stddev_samp_fieldsModelSelector } from "./gv_stddev_samp_fieldsModel.base"

/**
 * gv_stddev_samp_fieldsModel
 */
export const gv_stddev_samp_fieldsModel = gv_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
