import { SammlungRevVarianceFieldsModelBase } from "./SammlungRevVarianceFieldsModel.base"


/* A graphql query fragment builders for SammlungRevVarianceFieldsModel */
export { selectFromSammlungRevVarianceFields, sammlungRevVarianceFieldsModelPrimitives, SammlungRevVarianceFieldsModelSelector } from "./SammlungRevVarianceFieldsModel.base"

/**
 * SammlungRevVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const SammlungRevVarianceFieldsModel = SammlungRevVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
