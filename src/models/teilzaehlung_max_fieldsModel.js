import { teilzaehlung_max_fieldsModelBase } from "./teilzaehlung_max_fieldsModel.base"


/* A graphql query fragment builders for teilzaehlung_max_fieldsModel */
export { selectFromteilzaehlung_max_fields, teilzaehlung_max_fieldsModelPrimitives, teilzaehlung_max_fieldsModelSelector } from "./teilzaehlung_max_fieldsModel.base"

/**
 * teilzaehlung_max_fieldsModel
 *
 * aggregate max on columns
 */
export const teilzaehlung_max_fieldsModel = teilzaehlung_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
