import { teilzaehlung_avg_fieldsModelBase } from "./teilzaehlung_avg_fieldsModel.base"


/* A graphql query fragment builders for teilzaehlung_avg_fieldsModel */
export { selectFromteilzaehlung_avg_fields, teilzaehlung_avg_fieldsModelPrimitives, teilzaehlung_avg_fieldsModelSelector } from "./teilzaehlung_avg_fieldsModel.base"

/**
 * teilzaehlung_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const teilzaehlung_avg_fieldsModel = teilzaehlung_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
