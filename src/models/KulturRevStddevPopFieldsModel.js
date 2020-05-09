import { KulturRevStddevPopFieldsModelBase } from "./KulturRevStddevPopFieldsModel.base"


/* A graphql query fragment builders for KulturRevStddevPopFieldsModel */
export { selectFromKulturRevStddevPopFields, kulturRevStddevPopFieldsModelPrimitives, KulturRevStddevPopFieldsModelSelector } from "./KulturRevStddevPopFieldsModel.base"

/**
 * KulturRevStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const KulturRevStddevPopFieldsModel = KulturRevStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
