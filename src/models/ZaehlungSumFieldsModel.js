import { ZaehlungSumFieldsModelBase } from "./ZaehlungSumFieldsModel.base"


/* A graphql query fragment builders for ZaehlungSumFieldsModel */
export { selectFromZaehlungSumFields, zaehlungSumFieldsModelPrimitives, ZaehlungSumFieldsModelSelector } from "./ZaehlungSumFieldsModel.base"

/**
 * ZaehlungSumFieldsModel
 *
 * aggregate sum on columns
 */
export const ZaehlungSumFieldsModel = ZaehlungSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
