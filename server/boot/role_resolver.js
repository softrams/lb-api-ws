'use strict';

// Common functions
function reject(cb) {
  process.nextTick(function() {
    cb(null, false);
  });
}

function allow(cb) {
  process.nextTick(function() {
    cb(null, true);
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = function(app) {
  // Define a hook
  // app.models.Note.observe('access', function(ctx) {
  //   return sleep(2000).then(() => {
  //     console.log('Notes model accessed');
  //   });
  // });

  var Role = app.models.Role;

  Role.registerResolver('agent', function(role, context, cb) {
    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject(cb);
    }

    //
    //   1. Specific user ID Checks : context.accessToken.userId
    //   2. Filter : context.remotingContext.args.filter.where.xx
    //   3. Query String : context.remotingContext.req.params.xx
    //   4. Role based check
    //      if (!Role.isInRole('<ROLENAME>', context)) {
    //        return reject();
    //      }
    //   5. Method: context.method (ex: find)
    //   6. Model : context.modelName
    //

    if (
      context.method === 'find' &&
      context.remotingContext.args.filter &&
      context.remotingContext.args.filter.where &&
      context.remotingContext.args.filter.where.owner &&
      context.remotingContext.args.filter.where.owner === userId
    ) {
      return allow(cb);
    }

    if (
      context.method === 'findById' &&
      context.remotingContext.req.params.id // wrong logic
    ) {
      // Check if the book belongs to current user.
      context.models.Book.findById(
        context.remotingContext.req.params.id,
        function(err, instance) {
          if (instance && instance.owner === userId) {
            return allow(cb);
          } else {
            return reject(cb);
          }
        }
      );
      // return allow(cb);
    }

    // return reject(cb);
  });
};
