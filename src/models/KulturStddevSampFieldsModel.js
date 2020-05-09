import { KulturStddevSampFieldsModelBase } from "./KulturStddevSampFieldsModel.base"


/* A graphql query fragment builders for KulturStddevSampFieldsModel */
export { selectFromKulturStddevSampFields, kulturStddevSampFieldsModelPrimitives, KulturStddevSampFieldsModelSelector } from "./KulturStddevSampFieldsModel.base"

/**
 * KulturStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const KulturStddevSampFieldsModel = KulturStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
