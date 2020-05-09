import { TeilkulturRevAvgFieldsModelBase } from "./TeilkulturRevAvgFieldsModel.base"


/* A graphql query fragment builders for TeilkulturRevAvgFieldsModel */
export { selectFromTeilkulturRevAvgFields, teilkulturRevAvgFieldsModelPrimitives, TeilkulturRevAvgFieldsModelSelector } from "./TeilkulturRevAvgFieldsModel.base"

/**
 * TeilkulturRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const TeilkulturRevAvgFieldsModel = TeilkulturRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
