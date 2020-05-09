import { SammlungRevSumFieldsModelBase } from "./SammlungRevSumFieldsModel.base"


/* A graphql query fragment builders for SammlungRevSumFieldsModel */
export { selectFromSammlungRevSumFields, sammlungRevSumFieldsModelPrimitives, SammlungRevSumFieldsModelSelector } from "./SammlungRevSumFieldsModel.base"

/**
 * SammlungRevSumFieldsModel
 *
 * aggregate sum on columns
 */
export const SammlungRevSumFieldsModel = SammlungRevSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
