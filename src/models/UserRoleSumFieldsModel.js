import { UserRoleSumFieldsModelBase } from "./UserRoleSumFieldsModel.base"


/* A graphql query fragment builders for UserRoleSumFieldsModel */
export { selectFromUserRoleSumFields, userRoleSumFieldsModelPrimitives, UserRoleSumFieldsModelSelector } from "./UserRoleSumFieldsModel.base"

/**
 * UserRoleSumFieldsModel
 *
 * aggregate sum on columns
 */
export const UserRoleSumFieldsModel = UserRoleSumFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
