import { person_fileModelBase } from "./person_fileModel.base"


/* A graphql query fragment builders for person_fileModel */
export { selectFromperson_file, person_fileModelPrimitives, person_fileModelSelector } from "./person_fileModel.base"

/**
 * person_fileModel
 */
export const person_fileModel = person_fileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
