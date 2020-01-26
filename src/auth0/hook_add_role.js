function (user, context, cb) {
  const app_metadata = {
    roles: [user.user_metadata.userRole]
  };
  
  auth0.users.updateAppMetadata(user.user_id, app_metadata)
  .then(function(){
    cb();
  })
  .catch(function(err){
    cb();
  });
}