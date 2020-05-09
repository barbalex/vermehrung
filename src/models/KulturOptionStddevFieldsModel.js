import { KulturOptionStddevFieldsModelBase } from "./KulturOptionStddevFieldsModel.base"


/* A graphql query fragment builders for KulturOptionStddevFieldsModel */
export { selectFromKulturOptionStddevFields, kulturOptionStddevFieldsModelPrimitives, KulturOptionStddevFieldsModelSelector } from "./KulturOptionStddevFieldsModel.base"

/**
 * KulturOptionStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const KulturOptionStddevFieldsModel = KulturOptionStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
