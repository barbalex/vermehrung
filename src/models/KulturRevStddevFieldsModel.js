import { KulturRevStddevFieldsModelBase } from "./KulturRevStddevFieldsModel.base"


/* A graphql query fragment builders for KulturRevStddevFieldsModel */
export { selectFromKulturRevStddevFields, kulturRevStddevFieldsModelPrimitives, KulturRevStddevFieldsModelSelector } from "./KulturRevStddevFieldsModel.base"

/**
 * KulturRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const KulturRevStddevFieldsModel = KulturRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
