import { zaehlung_revModelBase } from "./zaehlung_revModel.base"


/* A graphql query fragment builders for zaehlung_revModel */
export { selectFromzaehlung_rev, zaehlung_revModelPrimitives, zaehlung_revModelSelector } from "./zaehlung_revModel.base"

/**
 * zaehlung_revModel
 *
 * columns and relationships of "zaehlung_rev"
 */
export const zaehlung_revModel = zaehlung_revModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
