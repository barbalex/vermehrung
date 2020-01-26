function (user, context, callback) {
  var request = require("request");

  var count = context.stats && context.stats.loginsCount ? context.stats.loginsCount : 0;
  const userRole = (user && user.user_metadata && user.user_metadata.userRole) ? user.user_metadata.userRole : undefined;
  if (count > 1 || !userRole) {
      return callback(null, user, context);
  }

  var headers = {
      'Authorization': 'Bearer ' + auth0.accessToken,
  };
  const data = {
      "roles": [
          `"[${userRole}]"`
      ]
  };

  request.post({
      url: `https://${auth0.domain}/api/v2/users/${user.user_id}/roles`,
      headers: headers,
      json: data
  }, (err, response, body) => {
      return callback(new Error("Can not update users with role"));
  });

  callback(null, user, context);
}