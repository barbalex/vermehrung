import { KulturQkStddevPopFieldsModelBase } from "./KulturQkStddevPopFieldsModel.base"


/* A graphql query fragment builders for KulturQkStddevPopFieldsModel */
export { selectFromKulturQkStddevPopFields, kulturQkStddevPopFieldsModelPrimitives, KulturQkStddevPopFieldsModelSelector } from "./KulturQkStddevPopFieldsModel.base"

/**
 * KulturQkStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const KulturQkStddevPopFieldsModel = KulturQkStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
