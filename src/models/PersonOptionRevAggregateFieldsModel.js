import { PersonOptionRevAggregateFieldsModelBase } from "./PersonOptionRevAggregateFieldsModel.base"


/* A graphql query fragment builders for PersonOptionRevAggregateFieldsModel */
export { selectFromPersonOptionRevAggregateFields, personOptionRevAggregateFieldsModelPrimitives, PersonOptionRevAggregateFieldsModelSelector } from "./PersonOptionRevAggregateFieldsModel.base"

/**
 * PersonOptionRevAggregateFieldsModel
 *
 * aggregate fields of "person_option_rev"
 */
export const PersonOptionRevAggregateFieldsModel = PersonOptionRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
