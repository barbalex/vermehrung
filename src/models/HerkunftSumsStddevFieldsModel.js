import { HerkunftSumsStddevFieldsModelBase } from "./HerkunftSumsStddevFieldsModel.base"


/* A graphql query fragment builders for HerkunftSumsStddevFieldsModel */
export { selectFromHerkunftSumsStddevFields, herkunftSumsStddevFieldsModelPrimitives, HerkunftSumsStddevFieldsModelSelector } from "./HerkunftSumsStddevFieldsModel.base"

/**
 * HerkunftSumsStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const HerkunftSumsStddevFieldsModel = HerkunftSumsStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
