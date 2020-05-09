import { ZaehlungStddevFieldsModelBase } from "./ZaehlungStddevFieldsModel.base"


/* A graphql query fragment builders for ZaehlungStddevFieldsModel */
export { selectFromZaehlungStddevFields, zaehlungStddevFieldsModelPrimitives, ZaehlungStddevFieldsModelSelector } from "./ZaehlungStddevFieldsModel.base"

/**
 * ZaehlungStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const ZaehlungStddevFieldsModel = ZaehlungStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
