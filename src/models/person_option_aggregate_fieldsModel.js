import { person_option_aggregate_fieldsModelBase } from "./person_option_aggregate_fieldsModel.base"


/* A graphql query fragment builders for person_option_aggregate_fieldsModel */
export { selectFromperson_option_aggregate_fields, person_option_aggregate_fieldsModelPrimitives, person_option_aggregate_fieldsModelSelector } from "./person_option_aggregate_fieldsModel.base"

/**
 * person_option_aggregate_fieldsModel
 *
 * aggregate fields of "person_option"
 */
export const person_option_aggregate_fieldsModel = person_option_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
