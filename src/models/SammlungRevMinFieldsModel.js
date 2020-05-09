import { SammlungRevMinFieldsModelBase } from "./SammlungRevMinFieldsModel.base"


/* A graphql query fragment builders for SammlungRevMinFieldsModel */
export { selectFromSammlungRevMinFields, sammlungRevMinFieldsModelPrimitives, SammlungRevMinFieldsModelSelector } from "./SammlungRevMinFieldsModel.base"

/**
 * SammlungRevMinFieldsModel
 *
 * aggregate min on columns
 */
export const SammlungRevMinFieldsModel = SammlungRevMinFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
