import { teilzaehlung_min_fieldsModelBase } from "./teilzaehlung_min_fieldsModel.base"


/* A graphql query fragment builders for teilzaehlung_min_fieldsModel */
export { selectFromteilzaehlung_min_fields, teilzaehlung_min_fieldsModelPrimitives, teilzaehlung_min_fieldsModelSelector } from "./teilzaehlung_min_fieldsModel.base"

/**
 * teilzaehlung_min_fieldsModel
 *
 * aggregate min on columns
 */
export const teilzaehlung_min_fieldsModel = teilzaehlung_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
