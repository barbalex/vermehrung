import { zaehlung_stddev_samp_fieldsModelBase } from "./zaehlung_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for zaehlung_stddev_samp_fieldsModel */
export { selectFromzaehlung_stddev_samp_fields, zaehlung_stddev_samp_fieldsModelPrimitives, zaehlung_stddev_samp_fieldsModelSelector } from "./zaehlung_stddev_samp_fieldsModel.base"

/**
 * zaehlung_stddev_samp_fieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const zaehlung_stddev_samp_fieldsModel = zaehlung_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
