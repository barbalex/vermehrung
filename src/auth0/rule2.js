function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  const namespace = "https://hasura.io/jwt/claims";
  // ensure userId exists
  const userId = (user && user.user_metadata && user.user_metadata.personId) ? user.user_metadata.personId : 1;
  const userRole = (user && user.user_metadata && user.user_metadata.userRole) ? user.user_metadata.userRole : 'nope';
  context.idToken[namespace] =
    {
      'x-hasura-default-role': context.authorization.roles[0],
      'x-hasura-role': userRole,
      'x-hasura-allowed-roles': [userRole],
      'x-hasura-user-id': userId
    };
  user.app_metadata.roles = [userRole];
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata);
  callback(null, user, context);
}