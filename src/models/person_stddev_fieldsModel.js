import { person_stddev_fieldsModelBase } from "./person_stddev_fieldsModel.base"


/* A graphql query fragment builders for person_stddev_fieldsModel */
export { selectFromperson_stddev_fields, person_stddev_fieldsModelPrimitives, person_stddev_fieldsModelSelector } from "./person_stddev_fieldsModel.base"

/**
 * person_stddev_fieldsModel
 *
 * aggregate stddev on columns
 */
export const person_stddev_fieldsModel = person_stddev_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
