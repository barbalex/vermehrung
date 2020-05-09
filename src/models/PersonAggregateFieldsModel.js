import { PersonAggregateFieldsModelBase } from "./PersonAggregateFieldsModel.base"


/* A graphql query fragment builders for PersonAggregateFieldsModel */
export { selectFromPersonAggregateFields, personAggregateFieldsModelPrimitives, PersonAggregateFieldsModelSelector } from "./PersonAggregateFieldsModel.base"

/**
 * PersonAggregateFieldsModel
 *
 * aggregate fields of "person"
 */
export const PersonAggregateFieldsModel = PersonAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
