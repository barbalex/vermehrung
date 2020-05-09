import { person_rev_sum_fieldsModelBase } from "./person_rev_sum_fieldsModel.base"


/* A graphql query fragment builders for person_rev_sum_fieldsModel */
export { selectFromperson_rev_sum_fields, person_rev_sum_fieldsModelPrimitives, person_rev_sum_fieldsModelSelector } from "./person_rev_sum_fieldsModel.base"

/**
 * person_rev_sum_fieldsModel
 *
 * aggregate sum on columns
 */
export const person_rev_sum_fieldsModel = person_rev_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
