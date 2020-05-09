import { ZaehlungRevVarianceFieldsModelBase } from "./ZaehlungRevVarianceFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevVarianceFieldsModel */
export { selectFromZaehlungRevVarianceFields, zaehlungRevVarianceFieldsModelPrimitives, ZaehlungRevVarianceFieldsModelSelector } from "./ZaehlungRevVarianceFieldsModel.base"

/**
 * ZaehlungRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const ZaehlungRevVarianceFieldsModel = ZaehlungRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
