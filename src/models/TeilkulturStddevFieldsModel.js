import { TeilkulturStddevFieldsModelBase } from "./TeilkulturStddevFieldsModel.base"


/* A graphql query fragment builders for TeilkulturStddevFieldsModel */
export { selectFromTeilkulturStddevFields, teilkulturStddevFieldsModelPrimitives, TeilkulturStddevFieldsModelSelector } from "./TeilkulturStddevFieldsModel.base"

/**
 * TeilkulturStddevFieldsModel
 *
 * aggregate stddev on columns
 */
export const TeilkulturStddevFieldsModel = TeilkulturStddevFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
