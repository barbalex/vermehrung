import { sammlung_sum_fieldsModelBase } from "./sammlung_sum_fieldsModel.base"


/* A graphql query fragment builders for sammlung_sum_fieldsModel */
export { selectFromsammlung_sum_fields, sammlung_sum_fieldsModelPrimitives, sammlung_sum_fieldsModelSelector } from "./sammlung_sum_fieldsModel.base"

/**
 * sammlung_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const sammlung_sum_fieldsModel = sammlung_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
