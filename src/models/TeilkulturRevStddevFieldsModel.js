import { TeilkulturRevStddevFieldsModelBase } from "./TeilkulturRevStddevFieldsModel.base"


/* A graphql query fragment builders for TeilkulturRevStddevFieldsModel */
export { selectFromTeilkulturRevStddevFields, teilkulturRevStddevFieldsModelPrimitives, TeilkulturRevStddevFieldsModelSelector } from "./TeilkulturRevStddevFieldsModel.base"

/**
 * TeilkulturRevStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const TeilkulturRevStddevFieldsModel = TeilkulturRevStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
