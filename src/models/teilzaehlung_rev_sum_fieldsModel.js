import { teilzaehlung_rev_sum_fieldsModelBase } from "./teilzaehlung_rev_sum_fieldsModel.base"


/* A graphql query fragment builders for teilzaehlung_rev_sum_fieldsModel */
export { selectFromteilzaehlung_rev_sum_fields, teilzaehlung_rev_sum_fieldsModelPrimitives, teilzaehlung_rev_sum_fieldsModelSelector } from "./teilzaehlung_rev_sum_fieldsModel.base"

/**
 * teilzaehlung_rev_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const teilzaehlung_rev_sum_fieldsModel = teilzaehlung_rev_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
