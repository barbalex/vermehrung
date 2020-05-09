import { PersonAggregateModelBase } from "./PersonAggregateModel.base"


/* A graphql query fragment builders for PersonAggregateModel */
export { selectFromPersonAggregate, personAggregateModelPrimitives, PersonAggregateModelSelector } from "./PersonAggregateModel.base"

/**
 * PersonAggregateModel
 *
 * aggregated selection of "person"
 */
export const PersonAggregateModel = PersonAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
