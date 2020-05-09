import { KulturOptionRevStddevFieldsModelBase } from "./KulturOptionRevStddevFieldsModel.base"


/* A graphql query fragment builders for KulturOptionRevStddevFieldsModel */
export { selectFromKulturOptionRevStddevFields, kulturOptionRevStddevFieldsModelPrimitives, KulturOptionRevStddevFieldsModelSelector } from "./KulturOptionRevStddevFieldsModel.base"

/**
 * KulturOptionRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const KulturOptionRevStddevFieldsModel = KulturOptionRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
