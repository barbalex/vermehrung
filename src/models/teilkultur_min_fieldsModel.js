import { teilkultur_min_fieldsModelBase } from "./teilkultur_min_fieldsModel.base"


/* A graphql query fragment builders for teilkultur_min_fieldsModel */
export { selectFromteilkultur_min_fields, teilkultur_min_fieldsModelPrimitives, teilkultur_min_fieldsModelSelector } from "./teilkultur_min_fieldsModel.base"

/**
 * teilkultur_min_fieldsModel
 *
 * aggregate min on columns
 */
export const teilkultur_min_fieldsModel = teilkultur_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
