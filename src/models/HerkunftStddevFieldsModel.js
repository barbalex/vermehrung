import { HerkunftStddevFieldsModelBase } from "./HerkunftStddevFieldsModel.base"


/* A graphql query fragment builders for HerkunftStddevFieldsModel */
export { selectFromHerkunftStddevFields, herkunftStddevFieldsModelPrimitives, HerkunftStddevFieldsModelSelector } from "./HerkunftStddevFieldsModel.base"

/**
 * HerkunftStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const HerkunftStddevFieldsModel = HerkunftStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
