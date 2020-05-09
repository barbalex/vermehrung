import { KulturQkStddevFieldsModelBase } from "./KulturQkStddevFieldsModel.base"


/* A graphql query fragment builders for KulturQkStddevFieldsModel */
export { selectFromKulturQkStddevFields, kulturQkStddevFieldsModelPrimitives, KulturQkStddevFieldsModelSelector } from "./KulturQkStddevFieldsModel.base"

/**
 * KulturQkStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const KulturQkStddevFieldsModel = KulturQkStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
