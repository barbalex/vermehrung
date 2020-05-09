import { ZaehlungRevAvgFieldsModelBase } from "./ZaehlungRevAvgFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevAvgFieldsModel */
export { selectFromZaehlungRevAvgFields, zaehlungRevAvgFieldsModelPrimitives, ZaehlungRevAvgFieldsModelSelector } from "./ZaehlungRevAvgFieldsModel.base"

/**
 * ZaehlungRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const ZaehlungRevAvgFieldsModel = ZaehlungRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
