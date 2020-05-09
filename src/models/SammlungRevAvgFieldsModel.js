import { SammlungRevAvgFieldsModelBase } from "./SammlungRevAvgFieldsModel.base"


/* A graphql query fragment builders for SammlungRevAvgFieldsModel */
export { selectFromSammlungRevAvgFields, sammlungRevAvgFieldsModelPrimitives, SammlungRevAvgFieldsModelSelector } from "./SammlungRevAvgFieldsModel.base"

/**
 * SammlungRevAvgFieldsModel
 *
 * aggregate avg on columns
 */
export const SammlungRevAvgFieldsModel = SammlungRevAvgFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
