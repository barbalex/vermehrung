import { person_aggregateModelBase } from "./person_aggregateModel.base"


/* A graphql query fragment builders for person_aggregateModel */
export { selectFromperson_aggregate, person_aggregateModelPrimitives, person_aggregateModelSelector } from "./person_aggregateModel.base"

/**
 * person_aggregateModel
 *
 * aggregated selection of "person"
 */
export const person_aggregateModel = person_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
