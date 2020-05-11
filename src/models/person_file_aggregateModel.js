import { person_file_aggregateModelBase } from "./person_file_aggregateModel.base"


/* A graphql query fragment builders for person_file_aggregateModel */
export { selectFromperson_file_aggregate, person_file_aggregateModelPrimitives, person_file_aggregateModelSelector } from "./person_file_aggregateModel.base"

/**
 * person_file_aggregateModel
 *
 * aggregated selection of "person_file"
 */
export const person_file_aggregateModel = person_file_aggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
