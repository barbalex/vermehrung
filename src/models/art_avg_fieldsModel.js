import { art_avg_fieldsModelBase } from "./art_avg_fieldsModel.base"


/* A graphql query fragment builders for art_avg_fieldsModel */
export { selectFromart_avg_fields, art_avg_fieldsModelPrimitives, art_avg_fieldsModelSelector } from "./art_avg_fieldsModel.base"

/**
 * art_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const art_avg_fieldsModel = art_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
