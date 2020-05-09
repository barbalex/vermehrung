import { MutationRootModelBase } from "./MutationRootModel.base"


/* A graphql query fragment builders for MutationRootModel */
export { selectFromMutationRoot, mutationRootModelPrimitives, MutationRootModelSelector } from "./MutationRootModel.base"

/**
 * MutationRootModel
 *
 * mutation root
 */
export const MutationRootModel = MutationRootModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
