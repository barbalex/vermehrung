import { KulturOptionStddevPopFieldsModelBase } from "./KulturOptionStddevPopFieldsModel.base"


/* A graphql query fragment builders for KulturOptionStddevPopFieldsModel */
export { selectFromKulturOptionStddevPopFields, kulturOptionStddevPopFieldsModelPrimitives, KulturOptionStddevPopFieldsModelSelector } from "./KulturOptionStddevPopFieldsModel.base"

/**
 * KulturOptionStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const KulturOptionStddevPopFieldsModel = KulturOptionStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
