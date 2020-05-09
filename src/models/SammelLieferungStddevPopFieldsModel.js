import { SammelLieferungStddevPopFieldsModelBase } from "./SammelLieferungStddevPopFieldsModel.base"


/* A graphql query fragment builders for SammelLieferungStddevPopFieldsModel */
export { selectFromSammelLieferungStddevPopFields, sammelLieferungStddevPopFieldsModelPrimitives, SammelLieferungStddevPopFieldsModelSelector } from "./SammelLieferungStddevPopFieldsModel.base"

/**
 * SammelLieferungStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const SammelLieferungStddevPopFieldsModel = SammelLieferungStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
