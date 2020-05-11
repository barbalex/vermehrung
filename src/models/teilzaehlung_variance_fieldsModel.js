import { teilzaehlung_variance_fieldsModelBase } from "./teilzaehlung_variance_fieldsModel.base"


/* A graphql query fragment builders for teilzaehlung_variance_fieldsModel */
export { selectFromteilzaehlung_variance_fields, teilzaehlung_variance_fieldsModelPrimitives, teilzaehlung_variance_fieldsModelSelector } from "./teilzaehlung_variance_fieldsModel.base"

/**
 * teilzaehlung_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const teilzaehlung_variance_fieldsModel = teilzaehlung_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
