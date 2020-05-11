import { sammel_lieferung_rev_stddev_fieldsModelBase } from "./sammel_lieferung_rev_stddev_fieldsModel.base"


/* A graphql query fragment builders for sammel_lieferung_rev_stddev_fieldsModel */
export { selectFromsammel_lieferung_rev_stddev_fields, sammel_lieferung_rev_stddev_fieldsModelPrimitives, sammel_lieferung_rev_stddev_fieldsModelSelector } from "./sammel_lieferung_rev_stddev_fieldsModel.base"

/**
 * sammel_lieferung_rev_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const sammel_lieferung_rev_stddev_fieldsModel = sammel_lieferung_rev_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
