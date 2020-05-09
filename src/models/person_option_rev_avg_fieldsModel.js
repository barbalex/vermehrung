import { person_option_rev_avg_fieldsModelBase } from "./person_option_rev_avg_fieldsModel.base"


/* A graphql query fragment builders for person_option_rev_avg_fieldsModel */
export { selectFromperson_option_rev_avg_fields, person_option_rev_avg_fieldsModelPrimitives, person_option_rev_avg_fieldsModelSelector } from "./person_option_rev_avg_fieldsModel.base"

/**
 * person_option_rev_avg_fieldsModel
 *
 * aggregate avg on columns
 */
export const person_option_rev_avg_fieldsModel = person_option_rev_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
