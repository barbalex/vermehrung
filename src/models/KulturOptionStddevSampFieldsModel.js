import { KulturOptionStddevSampFieldsModelBase } from "./KulturOptionStddevSampFieldsModel.base"


/* A graphql query fragment builders for KulturOptionStddevSampFieldsModel */
export { selectFromKulturOptionStddevSampFields, kulturOptionStddevSampFieldsModelPrimitives, KulturOptionStddevSampFieldsModelSelector } from "./KulturOptionStddevSampFieldsModel.base"

/**
 * KulturOptionStddevSampFieldsModel
 *
 * aggregate stddev_samp on columns
 */
export const KulturOptionStddevSampFieldsModel = KulturOptionStddevSampFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
