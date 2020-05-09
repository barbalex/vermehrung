import { SammlungRevMaxFieldsModelBase } from "./SammlungRevMaxFieldsModel.base"


/* A graphql query fragment builders for SammlungRevMaxFieldsModel */
export { selectFromSammlungRevMaxFields, sammlungRevMaxFieldsModelPrimitives, SammlungRevMaxFieldsModelSelector } from "./SammlungRevMaxFieldsModel.base"

/**
 * SammlungRevMaxFieldsModel
 *
 * aggregate max on columns
 */
export const SammlungRevMaxFieldsModel = SammlungRevMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
