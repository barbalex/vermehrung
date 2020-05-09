import { person_aggregate_fieldsModelBase } from "./person_aggregate_fieldsModel.base"


/* A graphql query fragment builders for person_aggregate_fieldsModel */
export { selectFromperson_aggregate_fields, person_aggregate_fieldsModelPrimitives, person_aggregate_fieldsModelSelector } from "./person_aggregate_fieldsModel.base"

/**
 * person_aggregate_fieldsModel
 *
 * aggregate fields of "person"
 */
export const person_aggregate_fieldsModel = person_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
