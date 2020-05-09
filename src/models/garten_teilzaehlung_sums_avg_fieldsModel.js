import { garten_teilzaehlung_sums_avg_fieldsModelBase } from "./garten_teilzaehlung_sums_avg_fieldsModel.base"


/* A graphql query fragment builders for garten_teilzaehlung_sums_avg_fieldsModel */
export { selectFromgarten_teilzaehlung_sums_avg_fields, garten_teilzaehlung_sums_avg_fieldsModelPrimitives, garten_teilzaehlung_sums_avg_fieldsModelSelector } from "./garten_teilzaehlung_sums_avg_fieldsModel.base"

/**
 * garten_teilzaehlung_sums_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const garten_teilzaehlung_sums_avg_fieldsModel = garten_teilzaehlung_sums_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
