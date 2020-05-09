import { PersonRevAggregateFieldsModelBase } from "./PersonRevAggregateFieldsModel.base"


/* A graphql query fragment builders for PersonRevAggregateFieldsModel */
export { selectFromPersonRevAggregateFields, personRevAggregateFieldsModelPrimitives, PersonRevAggregateFieldsModelSelector } from "./PersonRevAggregateFieldsModel.base"

/**
 * PersonRevAggregateFieldsModel
 *
 * aggregate fields of "person_rev"
 */
export const PersonRevAggregateFieldsModel = PersonRevAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
