import { teilkultur_variance_fieldsModelBase } from "./teilkultur_variance_fieldsModel.base"


/* A graphql query fragment builders for teilkultur_variance_fieldsModel */
export { selectFromteilkultur_variance_fields, teilkultur_variance_fieldsModelPrimitives, teilkultur_variance_fieldsModelSelector } from "./teilkultur_variance_fieldsModel.base"

/**
 * teilkultur_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const teilkultur_variance_fieldsModel = teilkultur_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
