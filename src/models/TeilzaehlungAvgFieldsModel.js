import { TeilzaehlungAvgFieldsModelBase } from "./TeilzaehlungAvgFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungAvgFieldsModel */
export { selectFromTeilzaehlungAvgFields, teilzaehlungAvgFieldsModelPrimitives, TeilzaehlungAvgFieldsModelSelector } from "./TeilzaehlungAvgFieldsModel.base"

/**
 * TeilzaehlungAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const TeilzaehlungAvgFieldsModel = TeilzaehlungAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
