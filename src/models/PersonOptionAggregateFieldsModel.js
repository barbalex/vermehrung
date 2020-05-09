import { PersonOptionAggregateFieldsModelBase } from "./PersonOptionAggregateFieldsModel.base"


/* A graphql query fragment builders for PersonOptionAggregateFieldsModel */
export { selectFromPersonOptionAggregateFields, personOptionAggregateFieldsModelPrimitives, PersonOptionAggregateFieldsModelSelector } from "./PersonOptionAggregateFieldsModel.base"

/**
 * PersonOptionAggregateFieldsModel
 *
 * aggregate fields of "person_option"
 */
export const PersonOptionAggregateFieldsModel = PersonOptionAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
