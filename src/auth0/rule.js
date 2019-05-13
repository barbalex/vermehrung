function (user, context, callback) {
  const namespace = "https://hasura.io/jwt/claims";
  // ensure userId exists
  const userId = (user && user.user_metadata && user.user_metadata.personId) ? user.user_metadata.personId : 1;
  context.idToken[namespace] =
    {
      'x-hasura-default-role': context.authorization.roles[0],
      'x-hasura-role': context.authorization.roles[0],
      // do some custom logic to decide allowed roles
      'x-hasura-allowed-roles': context.authorization.roles,
      'x-hasura-user-id': userId
    };
  callback(null, user, context);
}