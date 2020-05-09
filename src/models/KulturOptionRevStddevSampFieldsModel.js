import { KulturOptionRevStddevSampFieldsModelBase } from "./KulturOptionRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for KulturOptionRevStddevSampFieldsModel */
export { selectFromKulturOptionRevStddevSampFields, kulturOptionRevStddevSampFieldsModelPrimitives, KulturOptionRevStddevSampFieldsModelSelector } from "./KulturOptionRevStddevSampFieldsModel.base"

/**
 * KulturOptionRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const KulturOptionRevStddevSampFieldsModel = KulturOptionRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
