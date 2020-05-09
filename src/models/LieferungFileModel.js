import { LieferungFileModelBase } from "./LieferungFileModel.base"


/* A graphql query fragment builders for LieferungFileModel */
export { selectFromLieferungFile, lieferungFileModelPrimitives, LieferungFileModelSelector } from "./LieferungFileModel.base"

/**
 * LieferungFileModel
 *
 * columns and relationships of "lieferung_file"
 */
export const LieferungFileModel = LieferungFileModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
