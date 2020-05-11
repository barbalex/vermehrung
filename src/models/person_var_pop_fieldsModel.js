import { person_var_pop_fieldsModelBase } from "./person_var_pop_fieldsModel.base"


/* A graphql query fragment builders for person_var_pop_fieldsModel */
export { selectFromperson_var_pop_fields, person_var_pop_fieldsModelPrimitives, person_var_pop_fieldsModelSelector } from "./person_var_pop_fieldsModel.base"

/**
 * person_var_pop_fieldsModel
 *
 * aggregate var_pop on columns
 */
export const person_var_pop_fieldsModel = person_var_pop_fieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
