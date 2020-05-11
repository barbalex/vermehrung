import { av_art_mutation_responseModelBase } from "./av_art_mutation_responseModel.base"


/* A graphql query fragment builders for av_art_mutation_responseModel */
export { selectFromav_art_mutation_response, av_art_mutation_responseModelPrimitives, av_art_mutation_responseModelSelector } from "./av_art_mutation_responseModel.base"

/**
 * av_art_mutation_responseModel
 *
 * response of any mutation on the table "av_art"
 */
export const av_art_mutation_responseModel = av_art_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
