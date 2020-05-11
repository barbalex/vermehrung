import { person_max_fieldsModelBase } from "./person_max_fieldsModel.base"


/* A graphql query fragment builders for person_max_fieldsModel */
export { selectFromperson_max_fields, person_max_fieldsModelPrimitives, person_max_fieldsModelSelector } from "./person_max_fieldsModel.base"

/**
 * person_max_fieldsModel
 *
 * aggregate max on columns
 */
export const person_max_fieldsModel = person_max_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
