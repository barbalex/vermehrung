import { ZaehlungRevSumFieldsModelBase } from "./ZaehlungRevSumFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevSumFieldsModel */
export { selectFromZaehlungRevSumFields, zaehlungRevSumFieldsModelPrimitives, ZaehlungRevSumFieldsModelSelector } from "./ZaehlungRevSumFieldsModel.base"

/**
 * ZaehlungRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const ZaehlungRevSumFieldsModel = ZaehlungRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
