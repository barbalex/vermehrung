import { PersonOptionRevAggregateModelBase } from "./PersonOptionRevAggregateModel.base"


/* A graphql query fragment builders for PersonOptionRevAggregateModel */
export { selectFromPersonOptionRevAggregate, personOptionRevAggregateModelPrimitives, PersonOptionRevAggregateModelSelector } from "./PersonOptionRevAggregateModel.base"

/**
 * PersonOptionRevAggregateModel
 *
 * aggregated selection of "person_option_rev"
 */
export const PersonOptionRevAggregateModel = PersonOptionRevAggregateModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
