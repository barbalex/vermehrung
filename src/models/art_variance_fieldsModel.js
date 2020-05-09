import { art_variance_fieldsModelBase } from "./art_variance_fieldsModel.base"


/* A graphql query fragment builders for art_variance_fieldsModel */
export { selectFromart_variance_fields, art_variance_fieldsModelPrimitives, art_variance_fieldsModelSelector } from "./art_variance_fieldsModel.base"

/**
 * art_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const art_variance_fieldsModel = art_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
