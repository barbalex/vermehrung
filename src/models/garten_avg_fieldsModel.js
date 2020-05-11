import { garten_avg_fieldsModelBase } from "./garten_avg_fieldsModel.base"


/* A graphql query fragment builders for garten_avg_fieldsModel */
export { selectFromgarten_avg_fields, garten_avg_fieldsModelPrimitives, garten_avg_fieldsModelSelector } from "./garten_avg_fieldsModel.base"

/**
 * garten_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const garten_avg_fieldsModel = garten_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
