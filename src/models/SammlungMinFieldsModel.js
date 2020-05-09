import { SammlungMinFieldsModelBase } from "./SammlungMinFieldsModel.base"


/* A graphql query fragment builders for SammlungMinFieldsModel */
export { selectFromSammlungMinFields, sammlungMinFieldsModelPrimitives, SammlungMinFieldsModelSelector } from "./SammlungMinFieldsModel.base"

/**
 * SammlungMinFieldsModel
 *
 * aggregate min on columns
 */
export const SammlungMinFieldsModel = SammlungMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
