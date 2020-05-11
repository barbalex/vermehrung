import { lieferung_revModelBase } from "./lieferung_revModel.base"


/* A graphql query fragment builders for lieferung_revModel */
export { selectFromlieferung_rev, lieferung_revModelPrimitives, lieferung_revModelSelector } from "./lieferung_revModel.base"

/**
 * lieferung_revModel
 *
 * columns and relationships of "lieferung_rev"
 */
export const lieferung_revModel = lieferung_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
