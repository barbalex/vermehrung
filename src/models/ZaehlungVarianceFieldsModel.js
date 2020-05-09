import { ZaehlungVarianceFieldsModelBase } from "./ZaehlungVarianceFieldsModel.base"


/* A graphql query fragment builders for ZaehlungVarianceFieldsModel */
export { selectFromZaehlungVarianceFields, zaehlungVarianceFieldsModelPrimitives, ZaehlungVarianceFieldsModelSelector } from "./ZaehlungVarianceFieldsModel.base"

/**
 * ZaehlungVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const ZaehlungVarianceFieldsModel = ZaehlungVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
