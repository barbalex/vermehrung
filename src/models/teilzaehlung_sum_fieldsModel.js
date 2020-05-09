import { teilzaehlung_sum_fieldsModelBase } from "./teilzaehlung_sum_fieldsModel.base"


/* A graphql query fragment builders for teilzaehlung_sum_fieldsModel */
export { selectFromteilzaehlung_sum_fields, teilzaehlung_sum_fieldsModelPrimitives, teilzaehlung_sum_fieldsModelSelector } from "./teilzaehlung_sum_fieldsModel.base"

/**
 * teilzaehlung_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const teilzaehlung_sum_fieldsModel = teilzaehlung_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
