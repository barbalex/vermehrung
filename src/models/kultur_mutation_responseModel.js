import { kultur_mutation_responseModelBase } from "./kultur_mutation_responseModel.base"


/* A graphql query fragment builders for kultur_mutation_responseModel */
export { selectFromkultur_mutation_response, kultur_mutation_responseModelPrimitives, kultur_mutation_responseModelSelector } from "./kultur_mutation_responseModel.base"

/**
 * kultur_mutation_responseModel
 */
export const kultur_mutation_responseModel = kultur_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
