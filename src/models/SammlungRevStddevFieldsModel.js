import { SammlungRevStddevFieldsModelBase } from "./SammlungRevStddevFieldsModel.base"


/* A graphql query fragment builders for SammlungRevStddevFieldsModel */
export { selectFromSammlungRevStddevFields, sammlungRevStddevFieldsModelPrimitives, SammlungRevStddevFieldsModelSelector } from "./SammlungRevStddevFieldsModel.base"

/**
 * SammlungRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const SammlungRevStddevFieldsModel = SammlungRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
