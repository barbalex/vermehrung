import { UserRoleVarianceFieldsModelBase } from "./UserRoleVarianceFieldsModel.base"


/* A graphql query fragment builders for UserRoleVarianceFieldsModel */
export { selectFromUserRoleVarianceFields, userRoleVarianceFieldsModelPrimitives, UserRoleVarianceFieldsModelSelector } from "./UserRoleVarianceFieldsModel.base"

/**
 * UserRoleVarianceFieldsModel
 *
 * aggregate variance on columns
 */
export const UserRoleVarianceFieldsModel = UserRoleVarianceFieldsModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
