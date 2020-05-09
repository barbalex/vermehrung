import { garten_teilzaehlung_sums_max_fieldsModelBase } from "./garten_teilzaehlung_sums_max_fieldsModel.base"


/* A graphql query fragment builders for garten_teilzaehlung_sums_max_fieldsModel */
export { selectFromgarten_teilzaehlung_sums_max_fields, garten_teilzaehlung_sums_max_fieldsModelPrimitives, garten_teilzaehlung_sums_max_fieldsModelSelector } from "./garten_teilzaehlung_sums_max_fieldsModel.base"

/**
 * garten_teilzaehlung_sums_max_fieldsModel
 *
 * aggregate max on columns
 */
export const garten_teilzaehlung_sums_max_fieldsModel = garten_teilzaehlung_sums_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
