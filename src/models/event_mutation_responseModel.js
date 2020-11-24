import { event_mutation_responseModelBase } from "./event_mutation_responseModel.base"


/* A graphql query fragment builders for event_mutation_responseModel */
export { selectFromevent_mutation_response, event_mutation_responseModelPrimitives, event_mutation_responseModelSelector } from "./event_mutation_responseModel.base"

/**
 * event_mutation_responseModel
 */
export const event_mutation_responseModel = event_mutation_responseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
