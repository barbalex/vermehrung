import { person_option_aggregateModelBase } from "./person_option_aggregateModel.base"


/* A graphql query fragment builders for person_option_aggregateModel */
export { selectFromperson_option_aggregate, person_option_aggregateModelPrimitives, person_option_aggregateModelSelector } from "./person_option_aggregateModel.base"

/**
 * person_option_aggregateModel
 *
 * aggregated selection of "person_option"
 */
export const person_option_aggregateModel = person_option_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
