import { sammlung_stddev_samp_fieldsModelBase } from "./sammlung_stddev_samp_fieldsModel.base"


/* A graphql query fragment builders for sammlung_stddev_samp_fieldsModel */
export { selectFromsammlung_stddev_samp_fields, sammlung_stddev_samp_fieldsModelPrimitives, sammlung_stddev_samp_fieldsModelSelector } from "./sammlung_stddev_samp_fieldsModel.base"

/**
 * sammlung_stddev_samp_fieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const sammlung_stddev_samp_fieldsModel = sammlung_stddev_samp_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
