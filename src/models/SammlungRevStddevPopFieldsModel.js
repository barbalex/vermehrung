import { SammlungRevStddevPopFieldsModelBase } from "./SammlungRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for SammlungRevStddevPopFieldsModel */
export { selectFromSammlungRevStddevPopFields, sammlungRevStddevPopFieldsModelPrimitives, SammlungRevStddevPopFieldsModelSelector } from "./SammlungRevStddevPopFieldsModel.base"

/**
 * SammlungRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const SammlungRevStddevPopFieldsModel = SammlungRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
