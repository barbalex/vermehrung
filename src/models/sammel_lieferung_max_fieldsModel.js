import { sammel_lieferung_max_fieldsModelBase } from "./sammel_lieferung_max_fieldsModel.base"


/* A graphql query fragment builders for sammel_lieferung_max_fieldsModel */
export { selectFromsammel_lieferung_max_fields, sammel_lieferung_max_fieldsModelPrimitives, sammel_lieferung_max_fieldsModelSelector } from "./sammel_lieferung_max_fieldsModel.base"

/**
 * sammel_lieferung_max_fieldsModel
 *
 * aggregate max on columns
 */
export const sammel_lieferung_max_fieldsModel = sammel_lieferung_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
