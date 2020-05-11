import { sammel_lieferung_sum_fieldsModelBase } from "./sammel_lieferung_sum_fieldsModel.base"


/* A graphql query fragment builders for sammel_lieferung_sum_fieldsModel */
export { selectFromsammel_lieferung_sum_fields, sammel_lieferung_sum_fieldsModelPrimitives, sammel_lieferung_sum_fieldsModelSelector } from "./sammel_lieferung_sum_fieldsModel.base"

/**
 * sammel_lieferung_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const sammel_lieferung_sum_fieldsModel = sammel_lieferung_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
