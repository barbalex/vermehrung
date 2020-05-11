import { teilkultur_rev_stddev_samp_fieldsModelBase } from "./teilkultur_rev_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for teilkultur_rev_stddev_samp_fieldsModel */
export { selectFromteilkultur_rev_stddev_samp_fields, teilkultur_rev_stddev_samp_fieldsModelPrimitives, teilkultur_rev_stddev_samp_fieldsModelSelector } from "./teilkultur_rev_stddev_samp_fieldsModel.base"

/**
 * teilkultur_rev_stddev_samp_fieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const teilkultur_rev_stddev_samp_fieldsModel = teilkultur_rev_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
