import { person_optionModelBase } from "./person_optionModel.base"


/* A graphql query fragment builders for person_optionModel */
export { selectFromperson_option, person_optionModelPrimitives, person_optionModelSelector } from "./person_optionModel.base"

/**
 * person_optionModel
 *
 * columns and relationships of "person_option"
 */
export const person_optionModel = person_optionModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
