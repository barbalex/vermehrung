import { ZaehlungAvgFieldsModelBase } from "./ZaehlungAvgFieldsModel.base"


/* A graphql query fragment builders for ZaehlungAvgFieldsModel */
export { selectFromZaehlungAvgFields, zaehlungAvgFieldsModelPrimitives, ZaehlungAvgFieldsModelSelector } from "./ZaehlungAvgFieldsModel.base"

/**
 * ZaehlungAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const ZaehlungAvgFieldsModel = ZaehlungAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
