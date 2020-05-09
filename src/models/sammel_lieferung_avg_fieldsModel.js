import { sammel_lieferung_avg_fieldsModelBase } from "./sammel_lieferung_avg_fieldsModel.base"


/* A graphql query fragment builders for sammel_lieferung_avg_fieldsModel */
export { selectFromsammel_lieferung_avg_fields, sammel_lieferung_avg_fieldsModelPrimitives, sammel_lieferung_avg_fieldsModelSelector } from "./sammel_lieferung_avg_fieldsModel.base"

/**
 * sammel_lieferung_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const sammel_lieferung_avg_fieldsModel = sammel_lieferung_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
