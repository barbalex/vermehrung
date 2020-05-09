import { SammelLieferungStddevFieldsModelBase } from "./SammelLieferungStddevFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungStddevFieldsModel */
export { selectFromSammelLieferungStddevFields, sammelLieferungStddevFieldsModelPrimitives, SammelLieferungStddevFieldsModelSelector } from "./SammelLieferungStddevFieldsModel.base"

/**
 * SammelLieferungStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const SammelLieferungStddevFieldsModel = SammelLieferungStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
