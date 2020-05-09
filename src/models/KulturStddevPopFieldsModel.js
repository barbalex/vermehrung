import { KulturStddevPopFieldsModelBase } from "./KulturStddevPopFieldsModel.base"


/* A graphql query fragment builders for KulturStddevPopFieldsModel */
export { selectFromKulturStddevPopFields, kulturStddevPopFieldsModelPrimitives, KulturStddevPopFieldsModelSelector } from "./KulturStddevPopFieldsModel.base"

/**
 * KulturStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const KulturStddevPopFieldsModel = KulturStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
