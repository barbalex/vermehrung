import { person_sum_fieldsModelBase } from "./person_sum_fieldsModel.base"


/* A graphql query fragment builders for person_sum_fieldsModel */
export { selectFromperson_sum_fields, person_sum_fieldsModelPrimitives, person_sum_fieldsModelSelector } from "./person_sum_fieldsModel.base"

/**
 * person_sum_fieldsModel
 */
export const person_sum_fieldsModel = person_sum_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
