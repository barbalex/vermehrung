import { KulturQkStddevSampFieldsModelBase } from "./KulturQkStddevSampFieldsModel.base"


/* A graphql query fragment builders for KulturQkStddevSampFieldsModel */
export { selectFromKulturQkStddevSampFields, kulturQkStddevSampFieldsModelPrimitives, KulturQkStddevSampFieldsModelSelector } from "./KulturQkStddevSampFieldsModel.base"

/**
 * KulturQkStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const KulturQkStddevSampFieldsModel = KulturQkStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
