import { person_option_rev_stddev_pop_fieldsModelBase } from "./person_option_rev_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for person_option_rev_stddev_pop_fieldsModel */
export { selectFromperson_option_rev_stddev_pop_fields, person_option_rev_stddev_pop_fieldsModelPrimitives, person_option_rev_stddev_pop_fieldsModelSelector } from "./person_option_rev_stddev_pop_fieldsModel.base"

/**
 * person_option_rev_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const person_option_rev_stddev_pop_fieldsModel = person_option_rev_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
