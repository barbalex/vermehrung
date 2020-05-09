import { SammelLieferungRevModelBase } from "./SammelLieferungRevModel.base"


/* A graphql query fragment builders for SammelLieferungRevModel */
export { selectFromSammelLieferungRev, sammelLieferungRevModelPrimitives, SammelLieferungRevModelSelector } from "./SammelLieferungRevModel.base"

/**
 * SammelLieferungRevModel
 *
 * columns and relationships of "sammel_lieferung_rev"
 */
export const SammelLieferungRevModel = SammelLieferungRevModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
