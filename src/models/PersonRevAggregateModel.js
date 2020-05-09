import { PersonRevAggregateModelBase } from "./PersonRevAggregateModel.base"


/* A graphql query fragment builders for PersonRevAggregateModel */
export { selectFromPersonRevAggregate, personRevAggregateModelPrimitives, PersonRevAggregateModelSelector } from "./PersonRevAggregateModel.base"

/**
 * PersonRevAggregateModel
 *
 * aggregated selection of "person_rev"
 */
export const PersonRevAggregateModel = PersonRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
