angular.module('myEasyClass')
    .factory('userFactory', ['$q', function ($q) {
        var parseUser = {
            data: {
                loggedIn: Parse.User.current()
            },
            logIn: function (username, pw) {
                var deferred = $q.defer();
                Parse.User.logIn(username, pw, {
                    success: function(user) {
                        deferred.resolve(user);
                    },
                    error: function(user, error) {
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            }
        };
        return parseUser;
    }]);