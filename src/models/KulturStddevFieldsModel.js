import { KulturStddevFieldsModelBase } from "./KulturStddevFieldsModel.base"


/* A graphql query fragment builders for KulturStddevFieldsModel */
export { selectFromKulturStddevFields, kulturStddevFieldsModelPrimitives, KulturStddevFieldsModelSelector } from "./KulturStddevFieldsModel.base"

/**
 * KulturStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const KulturStddevFieldsModel = KulturStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
