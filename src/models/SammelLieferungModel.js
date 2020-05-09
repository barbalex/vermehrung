import { SammelLieferungModelBase } from "./SammelLieferungModel.base"


/* A graphql query fragment builders for SammelLieferungModel */
export { selectFromSammelLieferung, sammelLieferungModelPrimitives, SammelLieferungModelSelector } from "./SammelLieferungModel.base"

/**
 * SammelLieferungModel
 *
 * columns and relationships of "sammel_lieferung"
 */
export const SammelLieferungModel = SammelLieferungModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
