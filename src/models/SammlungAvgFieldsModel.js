import { SammlungAvgFieldsModelBase } from "./SammlungAvgFieldsModel.base"


/* A graphql query fragment builders for SammlungAvgFieldsModel */
export { selectFromSammlungAvgFields, sammlungAvgFieldsModelPrimitives, SammlungAvgFieldsModelSelector } from "./SammlungAvgFieldsModel.base"

/**
 * SammlungAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const SammlungAvgFieldsModel = SammlungAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
