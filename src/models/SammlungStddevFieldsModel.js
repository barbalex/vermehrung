import { SammlungStddevFieldsModelBase } from "./SammlungStddevFieldsModel.base"


/* A graphql query fragment builders for SammlungStddevFieldsModel */
export { selectFromSammlungStddevFields, sammlungStddevFieldsModelPrimitives, SammlungStddevFieldsModelSelector } from "./SammlungStddevFieldsModel.base"

/**
 * SammlungStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const SammlungStddevFieldsModel = SammlungStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
