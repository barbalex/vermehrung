import { HerkunftSumsStddevPopFieldsModelBase } from "./HerkunftSumsStddevPopFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsStddevPopFieldsModel */
export { selectFromHerkunftSumsStddevPopFields, herkunftSumsStddevPopFieldsModelPrimitives, HerkunftSumsStddevPopFieldsModelSelector } from "./HerkunftSumsStddevPopFieldsModel.base"

/**
 * HerkunftSumsStddevPopFieldsModel
 *
 * aggregate stddev_pop on columns
 */
export const HerkunftSumsStddevPopFieldsModel = HerkunftSumsStddevPopFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
