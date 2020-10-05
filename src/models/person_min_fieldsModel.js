import { person_min_fieldsModelBase } from "./person_min_fieldsModel.base"


/* A graphql query fragment builders for person_min_fieldsModel */
export { selectFromperson_min_fields, person_min_fieldsModelPrimitives, person_min_fieldsModelSelector } from "./person_min_fieldsModel.base"

/**
 * person_min_fieldsModel
 */
export const person_min_fieldsModel = person_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
