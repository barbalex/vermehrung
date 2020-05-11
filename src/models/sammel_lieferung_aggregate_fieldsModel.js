import { sammel_lieferung_aggregate_fieldsModelBase } from "./sammel_lieferung_aggregate_fieldsModel.base"


/* A graphql query fragment builders for sammel_lieferung_aggregate_fieldsModel */
export { selectFromsammel_lieferung_aggregate_fields, sammel_lieferung_aggregate_fieldsModelPrimitives, sammel_lieferung_aggregate_fieldsModelSelector } from "./sammel_lieferung_aggregate_fieldsModel.base"

/**
 * sammel_lieferung_aggregate_fieldsModel
 *
 * aggregate fields of "sammel_lieferung"
 */
export const sammel_lieferung_aggregate_fieldsModel = sammel_lieferung_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
