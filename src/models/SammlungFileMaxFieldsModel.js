import { SammlungFileMaxFieldsModelBase } from "./SammlungFileMaxFieldsModel.base"


/* A graphql query fragment builders for SammlungFileMaxFieldsModel */
export { selectFromSammlungFileMaxFields, sammlungFileMaxFieldsModelPrimitives, SammlungFileMaxFieldsModelSelector } from "./SammlungFileMaxFieldsModel.base"

/**
 * SammlungFileMaxFieldsModel
 *
 * aggregate max on columns
 */
export const SammlungFileMaxFieldsModel = SammlungFileMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
