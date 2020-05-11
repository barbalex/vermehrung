import { person_file_aggregate_fieldsModelBase } from "./person_file_aggregate_fieldsModel.base"


/* A graphql query fragment builders for person_file_aggregate_fieldsModel */
export { selectFromperson_file_aggregate_fields, person_file_aggregate_fieldsModelPrimitives, person_file_aggregate_fieldsModelSelector } from "./person_file_aggregate_fieldsModel.base"

/**
 * person_file_aggregate_fieldsModel
 *
 * aggregate fields of "person_file"
 */
export const person_file_aggregate_fieldsModel = person_file_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
