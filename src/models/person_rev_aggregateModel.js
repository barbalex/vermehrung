import { person_rev_aggregateModelBase } from "./person_rev_aggregateModel.base"


/* A graphql query fragment builders for person_rev_aggregateModel */
export { selectFromperson_rev_aggregate, person_rev_aggregateModelPrimitives, person_rev_aggregateModelSelector } from "./person_rev_aggregateModel.base"

/**
 * person_rev_aggregateModel
 *
 * aggregated selection of "person_rev"
 */
export const person_rev_aggregateModel = person_rev_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
