import { ZaehlungMinFieldsModelBase } from "./ZaehlungMinFieldsModel.base"


/* A graphql query fragment builders for ZaehlungMinFieldsModel */
export { selectFromZaehlungMinFields, zaehlungMinFieldsModelPrimitives, ZaehlungMinFieldsModelSelector } from "./ZaehlungMinFieldsModel.base"

/**
 * ZaehlungMinFieldsModel
 *
 * aggregate min on columns
 */
export const ZaehlungMinFieldsModel = ZaehlungMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
