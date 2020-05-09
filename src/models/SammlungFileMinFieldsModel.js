import { SammlungFileMinFieldsModelBase } from "./SammlungFileMinFieldsModel.base"


/* A graphql query fragment builders for SammlungFileMinFieldsModel */
export { selectFromSammlungFileMinFields, sammlungFileMinFieldsModelPrimitives, SammlungFileMinFieldsModelSelector } from "./SammlungFileMinFieldsModel.base"

/**
 * SammlungFileMinFieldsModel
 *
 * aggregate min on columns
 */
export const SammlungFileMinFieldsModel = SammlungFileMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
