import { ZaehlungRevMinFieldsModelBase } from "./ZaehlungRevMinFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevMinFieldsModel */
export { selectFromZaehlungRevMinFields, zaehlungRevMinFieldsModelPrimitives, ZaehlungRevMinFieldsModelSelector } from "./ZaehlungRevMinFieldsModel.base"

/**
 * ZaehlungRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const ZaehlungRevMinFieldsModel = ZaehlungRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
