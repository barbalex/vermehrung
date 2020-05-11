import { person_option_rev_max_fieldsModelBase } from "./person_option_rev_max_fieldsModel.base"


/* A graphql query fragment builders for person_option_rev_max_fieldsModel */
export { selectFromperson_option_rev_max_fields, person_option_rev_max_fieldsModelPrimitives, person_option_rev_max_fieldsModelSelector } from "./person_option_rev_max_fieldsModel.base"

/**
 * person_option_rev_max_fieldsModel
 *
 * aggregate max on columns
 */
export const person_option_rev_max_fieldsModel = person_option_rev_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
