import { person_variance_fieldsModelBase } from "./person_variance_fieldsModel.base"


/* A graphql query fragment builders for person_variance_fieldsModel */
export { selectFromperson_variance_fields, person_variance_fieldsModelPrimitives, person_variance_fieldsModelSelector } from "./person_variance_fieldsModel.base"

/**
 * person_variance_fieldsModel
 *
 * aggregate variance on columns
 */
export const person_variance_fieldsModel = person_variance_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
