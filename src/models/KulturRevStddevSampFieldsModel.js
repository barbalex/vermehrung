import { KulturRevStddevSampFieldsModelBase } from "./KulturRevStddevSampFieldsModel.base"


/* A graphql query fragment builders for KulturRevStddevSampFieldsModel */
export { selectFromKulturRevStddevSampFields, kulturRevStddevSampFieldsModelPrimitives, KulturRevStddevSampFieldsModelSelector } from "./KulturRevStddevSampFieldsModel.base"

/**
 * KulturRevStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const KulturRevStddevSampFieldsModel = KulturRevStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
