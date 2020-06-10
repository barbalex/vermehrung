import { av_mutation_responseModelBase } from "./av_mutation_responseModel.base"


/* A graphql query fragment builders for av_mutation_responseModel */
export { selectFromav_mutation_response, av_mutation_responseModelPrimitives, av_mutation_responseModelSelector } from "./av_mutation_responseModel.base"

/**
 * av_mutation_responseModel
 */
export const av_mutation_responseModel = av_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
