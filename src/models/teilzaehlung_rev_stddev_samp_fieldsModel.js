import { teilzaehlung_rev_stddev_samp_fieldsModelBase } from "./teilzaehlung_rev_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for teilzaehlung_rev_stddev_samp_fieldsModel */
export { selectFromteilzaehlung_rev_stddev_samp_fields, teilzaehlung_rev_stddev_samp_fieldsModelPrimitives, teilzaehlung_rev_stddev_samp_fieldsModelSelector } from "./teilzaehlung_rev_stddev_samp_fieldsModel.base"

/**
 * teilzaehlung_rev_stddev_samp_fieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const teilzaehlung_rev_stddev_samp_fieldsModel = teilzaehlung_rev_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
