import { kultur_fileModelBase } from "./kultur_fileModel.base"


/* A graphql query fragment builders for kultur_fileModel */
export { selectFromkultur_file, kultur_fileModelPrimitives, kultur_fileModelSelector } from "./kultur_fileModel.base"

/**
 * kultur_fileModel
 */
export const kultur_fileModel = kultur_fileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
