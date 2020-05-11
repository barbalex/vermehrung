import { teilzaehlung_rev_max_fieldsModelBase } from "./teilzaehlung_rev_max_fieldsModel.base"


/* A graphql query fragment builders for teilzaehlung_rev_max_fieldsModel */
export { selectFromteilzaehlung_rev_max_fields, teilzaehlung_rev_max_fieldsModelPrimitives, teilzaehlung_rev_max_fieldsModelSelector } from "./teilzaehlung_rev_max_fieldsModel.base"

/**
 * teilzaehlung_rev_max_fieldsModel
 *
 * aggregate max on columns
 */
export const teilzaehlung_rev_max_fieldsModel = teilzaehlung_rev_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
