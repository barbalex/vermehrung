import { person_stddev_pop_fieldsModelBase } from "./person_stddev_pop_fieldsModel.base"


/* A graphql query fragment builders for person_stddev_pop_fieldsModel */
export { selectFromperson_stddev_pop_fields, person_stddev_pop_fieldsModelPrimitives, person_stddev_pop_fieldsModelSelector } from "./person_stddev_pop_fieldsModel.base"

/**
 * person_stddev_pop_fieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const person_stddev_pop_fieldsModel = person_stddev_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
