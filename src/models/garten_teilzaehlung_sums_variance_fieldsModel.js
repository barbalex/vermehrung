import { garten_teilzaehlung_sums_variance_fieldsModelBase } from "./garten_teilzaehlung_sums_variance_fieldsModel.base"


/* A graphql query fragment builders for garten_teilzaehlung_sums_variance_fieldsModel */
export { selectFromgarten_teilzaehlung_sums_variance_fields, garten_teilzaehlung_sums_variance_fieldsModelPrimitives, garten_teilzaehlung_sums_variance_fieldsModelSelector } from "./garten_teilzaehlung_sums_variance_fieldsModel.base"

/**
 * garten_teilzaehlung_sums_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const garten_teilzaehlung_sums_variance_fieldsModel = garten_teilzaehlung_sums_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
