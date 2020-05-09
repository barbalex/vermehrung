import { garten_teilzaehlung_sums_stddev_fieldsModelBase } from "./garten_teilzaehlung_sums_stddev_fieldsModel.base"


/* A graphql query fragment builders for garten_teilzaehlung_sums_stddev_fieldsModel */
export { selectFromgarten_teilzaehlung_sums_stddev_fields, garten_teilzaehlung_sums_stddev_fieldsModelPrimitives, garten_teilzaehlung_sums_stddev_fieldsModelSelector } from "./garten_teilzaehlung_sums_stddev_fieldsModel.base"

/**
 * garten_teilzaehlung_sums_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const garten_teilzaehlung_sums_stddev_fieldsModel = garten_teilzaehlung_sums_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
