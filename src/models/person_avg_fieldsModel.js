import { person_avg_fieldsModelBase } from "./person_avg_fieldsModel.base"


/* A graphql query fragment builders for person_avg_fieldsModel */
export { selectFromperson_avg_fields, person_avg_fieldsModelPrimitives, person_avg_fieldsModelSelector } from "./person_avg_fieldsModel.base"

/**
 * person_avg_fieldsModel
 */
export const person_avg_fieldsModel = person_avg_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
