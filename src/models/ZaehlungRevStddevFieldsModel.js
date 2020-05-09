import { ZaehlungRevStddevFieldsModelBase } from "./ZaehlungRevStddevFieldsModel.base"


/* A graphql query fragment builders for ZaehlungRevStddevFieldsModel */
export { selectFromZaehlungRevStddevFields, zaehlungRevStddevFieldsModelPrimitives, ZaehlungRevStddevFieldsModelSelector } from "./ZaehlungRevStddevFieldsModel.base"

/**
 * ZaehlungRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const ZaehlungRevStddevFieldsModel = ZaehlungRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
