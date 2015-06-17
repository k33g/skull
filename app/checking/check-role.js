// check if user's role have the right to use de called route

import RoleModel from '../features/roles/model';

/* --- tools --- */
function getRole (roleName, callback, next) {
  RoleModel.findOne({name: roleName}, (err, model) => { // callback(err, data)
    callback(err, model);
  });
}

function checkIfRouteIsProtected (routeName, callback) {

  RoleModel.find((err, allRoles) => {
    var rootRoute = "";
    var isRouteProtected = allRoles.filter((role) => {
      return role.routes.filter((route) => {
          var routeStartWithRouteName = routeName.indexOf(route) === 0;
          if(routeStartWithRouteName) {
            rootRoute = route; // useful ?
          }
          return routeStartWithRouteName
          //return route == routeName;
        }).length > 0
    })[0]

    if (isRouteProtected) {
      callback(err, true)
    } else {
      callback(err, false)
    }

  });
}

export default function(req, res, next) {

  // about debug ...
  console.log("=== Checking roles ===")
  console.log("req.originalUrl", req.originalUrl);
  console.log("req.method", req.method);
  console.log("req.decoded[user]", req.decodedUser._id, req.decodedUser.role)

  //var currentUser = req.decodedUser;

  // check if route is protected
  checkIfRouteIsProtected(req.originalUrl, (err, isRouteProtected ) => {

    if (err) {
      var error = new Error('Error checking if route is protected.');
      error.statusCode = 500;
      return next(error);
    }

    if (isRouteProtected) {
      // check if user can use this route
      /*
        user -> role -> [routes]
       */
      getRole(req.decodedUser.role, (err, model) => { // model->role

        if (err) {
          var error = new Error('Error getting role of user for this route.');
          error.statusCode = 500;
          return next(error);
        }

        let filter = model.routes.filter((route) => {
          return req.originalUrl.indexOf(route) === 0;
        })

        if (filter.length > 0) { // user can use this route
          next();
        } else { // user can't use this route
          var error = new Error('Not enough ability!.');
          error.statusCode = 403;
          return next(error);
        }

        //next()
      })

    } else { // route is public
      next();
    }

  });

}