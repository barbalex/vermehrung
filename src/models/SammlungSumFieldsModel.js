import { SammlungSumFieldsModelBase } from "./SammlungSumFieldsModel.base"


/* A graphql query fragment builders for SammlungSumFieldsModel */
export { selectFromSammlungSumFields, sammlungSumFieldsModelPrimitives, SammlungSumFieldsModelSelector } from "./SammlungSumFieldsModel.base"

/**
 * SammlungSumFieldsModel
 *
 * aggregate sum on columns
 */
export const SammlungSumFieldsModel = SammlungSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
