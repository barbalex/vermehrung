import { garten_aggregate_fieldsModelBase } from "./garten_aggregate_fieldsModel.base"


/* A graphql query fragment builders for garten_aggregate_fieldsModel */
export { selectFromgarten_aggregate_fields, garten_aggregate_fieldsModelPrimitives, garten_aggregate_fieldsModelSelector } from "./garten_aggregate_fieldsModel.base"

/**
 * garten_aggregate_fieldsModel
 *
 * aggregate fields of "garten"
 */
export const garten_aggregate_fieldsModel = garten_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
