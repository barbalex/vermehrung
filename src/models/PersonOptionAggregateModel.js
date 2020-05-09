import { PersonOptionAggregateModelBase } from "./PersonOptionAggregateModel.base"


/* A graphql query fragment builders for PersonOptionAggregateModel */
export { selectFromPersonOptionAggregate, personOptionAggregateModelPrimitives, PersonOptionAggregateModelSelector } from "./PersonOptionAggregateModel.base"

/**
 * PersonOptionAggregateModel
 *
 * aggregated selection of "person_option"
 */
export const PersonOptionAggregateModel = PersonOptionAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
