import { teilzaehlung_stddev_samp_fieldsModelBase } from "./teilzaehlung_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for teilzaehlung_stddev_samp_fieldsModel */
export { selectFromteilzaehlung_stddev_samp_fields, teilzaehlung_stddev_samp_fieldsModelPrimitives, teilzaehlung_stddev_samp_fieldsModelSelector } from "./teilzaehlung_stddev_samp_fieldsModel.base"

/**
 * teilzaehlung_stddev_samp_fieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const teilzaehlung_stddev_samp_fieldsModel = teilzaehlung_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
