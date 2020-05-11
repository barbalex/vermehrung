import { art_max_fieldsModelBase } from "./art_max_fieldsModel.base"


/* A graphql query fragment builders for art_max_fieldsModel */
export { selectFromart_max_fields, art_max_fieldsModelPrimitives, art_max_fieldsModelSelector } from "./art_max_fieldsModel.base"

/**
 * art_max_fieldsModel
 *
 * aggregate max on columns
 */
export const art_max_fieldsModel = art_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
