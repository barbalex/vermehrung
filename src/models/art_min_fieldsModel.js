import { art_min_fieldsModelBase } from "./art_min_fieldsModel.base"


/* A graphql query fragment builders for art_min_fieldsModel */
export { selectFromart_min_fields, art_min_fieldsModelPrimitives, art_min_fieldsModelSelector } from "./art_min_fieldsModel.base"

/**
 * art_min_fieldsModel
 *
 * aggregate min on columns
 */
export const art_min_fieldsModel = art_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
