import { teilkultur_mutation_responseModelBase } from "./teilkultur_mutation_responseModel.base"


/* A graphql query fragment builders for teilkultur_mutation_responseModel */
export { selectFromteilkultur_mutation_response, teilkultur_mutation_responseModelPrimitives, teilkultur_mutation_responseModelSelector } from "./teilkultur_mutation_responseModel.base"

/**
 * teilkultur_mutation_responseModel
 *
 * response of any mutation on the table "teilkultur"
 */
export const teilkultur_mutation_responseModel = teilkultur_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
