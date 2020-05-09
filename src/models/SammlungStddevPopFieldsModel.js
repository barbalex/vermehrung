import { SammlungStddevPopFieldsModelBase } from "./SammlungStddevPopFieldsModel.base"


/* A graphql query fragment builders for SammlungStddevPopFieldsModel */
export { selectFromSammlungStddevPopFields, sammlungStddevPopFieldsModelPrimitives, SammlungStddevPopFieldsModelSelector } from "./SammlungStddevPopFieldsModel.base"

/**
 * SammlungStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const SammlungStddevPopFieldsModel = SammlungStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
