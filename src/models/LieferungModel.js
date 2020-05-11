import { lieferungModelBase } from "./lieferungModel.base"


/* A graphql query fragment builders for lieferungModel */
export { selectFromlieferung, lieferungModelPrimitives, lieferungModelSelector } from "./lieferungModel.base"

/**
 * lieferungModel
 *
 * columns and relationships of "lieferung"
 */
export const lieferungModel = lieferungModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
