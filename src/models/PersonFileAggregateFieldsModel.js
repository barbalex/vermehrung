import { PersonFileAggregateFieldsModelBase } from "./PersonFileAggregateFieldsModel.base"


/* A graphql query fragment builders for PersonFileAggregateFieldsModel */
export { selectFromPersonFileAggregateFields, personFileAggregateFieldsModelPrimitives, PersonFileAggregateFieldsModelSelector } from "./PersonFileAggregateFieldsModel.base"

/**
 * PersonFileAggregateFieldsModel
 *
 * aggregate fields of "person_file"
 */
export const PersonFileAggregateFieldsModel = PersonFileAggregateFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
