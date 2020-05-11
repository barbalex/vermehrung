import { person_rev_aggregate_fieldsModelBase } from "./person_rev_aggregate_fieldsModel.base"


/* A graphql query fragment builders for person_rev_aggregate_fieldsModel */
export { selectFromperson_rev_aggregate_fields, person_rev_aggregate_fieldsModelPrimitives, person_rev_aggregate_fieldsModelSelector } from "./person_rev_aggregate_fieldsModel.base"

/**
 * person_rev_aggregate_fieldsModel
 *
 * aggregate fields of "person_rev"
 */
export const person_rev_aggregate_fieldsModel = person_rev_aggregate_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
