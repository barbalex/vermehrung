import { QueryRootModelBase } from "./QueryRootModel.base"


/* A graphql query fragment builders for QueryRootModel */
export { selectFromQueryRoot, queryRootModelPrimitives, QueryRootModelSelector } from "./QueryRootModel.base"

/**
 * QueryRootModel
 *
 * query root
 */
export const QueryRootModel = QueryRootModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
