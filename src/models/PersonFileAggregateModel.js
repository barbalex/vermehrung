import { PersonFileAggregateModelBase } from "./PersonFileAggregateModel.base"


/* A graphql query fragment builders for PersonFileAggregateModel */
export { selectFromPersonFileAggregate, personFileAggregateModelPrimitives, PersonFileAggregateModelSelector } from "./PersonFileAggregateModel.base"

/**
 * PersonFileAggregateModel
 *
 * aggregated selection of "person_file"
 */
export const PersonFileAggregateModel = PersonFileAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
