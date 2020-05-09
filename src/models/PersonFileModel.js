import { PersonFileModelBase } from "./PersonFileModel.base"


/* A graphql query fragment builders for PersonFileModel */
export { selectFromPersonFile, personFileModelPrimitives, PersonFileModelSelector } from "./PersonFileModel.base"

/**
 * PersonFileModel
 *
 * columns and relationships of "person_file"
 */
export const PersonFileModel = PersonFileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
