import { person_option_rev_aggregateModelBase } from "./person_option_rev_aggregateModel.base"


/* A graphql query fragment builders for person_option_rev_aggregateModel */
export { selectFromperson_option_rev_aggregate, person_option_rev_aggregateModelPrimitives, person_option_rev_aggregateModelSelector } from "./person_option_rev_aggregateModel.base"

/**
 * person_option_rev_aggregateModel
 *
 * aggregated selection of "person_option_rev"
 */
export const person_option_rev_aggregateModel = person_option_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
