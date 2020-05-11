import { person_rev_min_fieldsModelBase } from "./person_rev_min_fieldsModel.base"


/* A graphql query fragment builders for person_rev_min_fieldsModel */
export { selectFromperson_rev_min_fields, person_rev_min_fieldsModelPrimitives, person_rev_min_fieldsModelSelector } from "./person_rev_min_fieldsModel.base"

/**
 * person_rev_min_fieldsModel
 *
 * aggregate min on columns
 */
export const person_rev_min_fieldsModel = person_rev_min_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
