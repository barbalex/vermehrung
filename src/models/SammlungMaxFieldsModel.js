import { SammlungMaxFieldsModelBase } from "./SammlungMaxFieldsModel.base"


/* A graphql query fragment builders for SammlungMaxFieldsModel */
export { selectFromSammlungMaxFields, sammlungMaxFieldsModelPrimitives, SammlungMaxFieldsModelSelector } from "./SammlungMaxFieldsModel.base"

/**
 * SammlungMaxFieldsModel
 *
 * aggregate max on columns
 */
export const SammlungMaxFieldsModel = SammlungMaxFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
