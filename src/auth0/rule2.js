function (user, context, callback) {
  user.app_metadata = user.app_metadata || {};
  const namespace = "https://hasura.io/jwt/claims";
  // ensure userId exists
  const userId = (user && user.user_metadata && user.user_metadata.personId) ? user.user_metadata.personId : 1;
  const userRole = (user && user.user_metadata && user.user_metadata.userRole) ? user.user_metadata.userRole : 'nope';
  context.idToken[namespace] =
    {
      'x-hasura-default-role': context.authorization.roles[0],
      'x-hasura-role': context.authorization.roles[0],
      'x-hasura-allowed-roles': context.authorization.roles,
      'x-hasura-user-id': userId
    };

  user.app_metadata.roles = user.app_metadata.roles || [];
  if (!user.app_metadata.roles.includes(userRole)) {
    user.app_metadata.roles.push(userRole);
  }
  // user.app_metadata.roles.push('test');
  auth0.users.updateAppMetadata(user.user_id, user.app_metadata)
  .then(function(){
    callback(null, user, context);
  })
  .catch(function(err){
    callback(err);
  });
}