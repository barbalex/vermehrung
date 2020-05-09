import { TeilzaehlungRevAvgFieldsModelBase } from "./TeilzaehlungRevAvgFieldsModel.base"


/* A graphql query fragment builders for TeilzaehlungRevAvgFieldsModel */
export { selectFromTeilzaehlungRevAvgFields, teilzaehlungRevAvgFieldsModelPrimitives, TeilzaehlungRevAvgFieldsModelSelector } from "./TeilzaehlungRevAvgFieldsModel.base"

/**
 * TeilzaehlungRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const TeilzaehlungRevAvgFieldsModel = TeilzaehlungRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
