angular.module('myEasyClass')
    .factory('userFactory', ['$q', function ($q) {
        var parseUser = {
            /**
             * Store user data/states to be used across scopes
            * */
            data: {
                username: null,
                parseUser: Parse.User.current()
            },
            currentUser: function () {
                var deferred = $q.defer();
                //checks if there is already an active user
                if (parseUser.data.username) {
                    deferred.resolve(parseUser.data.username);
                } else {
                    //Parse checks localStorage for a active user session
                    if (Parse.User.current()) {
                        parseUser.data.username = Parse.User._currentUser.attributes.username;
                        deferred.resolve(Parse.User._currentUser.attributes.username);
                    } else {
                        deferred.reject();
                    }
                }
                return deferred.promise;
            },
            logOut: function () {
                var deferred = $q.defer();
                Parse.User.logOut();
                parseUser.data.username = null;
                deferred.resolve();
                return deferred.promise;
            },
            logIn: function (username, pw) {
                var deferred = $q.defer();
                Parse.User.logIn(username, pw, {
                    success: function(user) {
                        parseUser.data.username = user.attributes.username;
                        deferred.resolve(user.attributes);
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