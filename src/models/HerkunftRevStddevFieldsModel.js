import { HerkunftRevStddevFieldsModelBase } from "./HerkunftRevStddevFieldsModel.base"


/* A graphql query fragment builders for HerkunftRevStddevFieldsModel */
export { selectFromHerkunftRevStddevFields, herkunftRevStddevFieldsModelPrimitives, HerkunftRevStddevFieldsModelSelector } from "./HerkunftRevStddevFieldsModel.base"

/**
 * HerkunftRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const HerkunftRevStddevFieldsModel = HerkunftRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
