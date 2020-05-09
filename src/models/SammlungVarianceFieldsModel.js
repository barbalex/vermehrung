import { SammlungVarianceFieldsModelBase } from "./SammlungVarianceFieldsModel.base"


/* A graphql query fragment builders for SammlungVarianceFieldsModel */
export { selectFromSammlungVarianceFields, sammlungVarianceFieldsModelPrimitives, SammlungVarianceFieldsModelSelector } from "./SammlungVarianceFieldsModel.base"

/**
 * SammlungVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const SammlungVarianceFieldsModel = SammlungVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
