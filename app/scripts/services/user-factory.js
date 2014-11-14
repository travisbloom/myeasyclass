angular.module('myEasyClass')
    .factory('userFactory', ['$q', function ($q) {
        var parseUser = {
            /**
             * Store user data/states to be used across scopes
            * */
            data: {
                username: null
            },
            currentUser: function () {
                //checks if there is already an active user
                if (parseUser.data.username) {
                    return parseUser.data.username;
                } else {
                    //Parse checks localStorage for a active user session
                    if (Parse.User.current()) {
                        parseUser.data.username = Parse.User._currentUser.attributes.username;
                        return Parse.User._currentUser.attributes.username;
                    } else {
                        return false;
                    }
                }
            },
            logOut: function () {
                Parse.User.logOut();
                parseUser.data.username = null;
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
            },
            createUser: function (username, pw) {
                var user = new Parse.User(), deferred = $q.defer();
                user.set("username", username);
                user.set("password", pw);
                user.set("School", "UConn");

                user.signUp(null, {
                    success: function (user) {
                        parseUser.data.username = user.attributes.username;
                        deferred.resolve(user.attributes);
                    },
                    error: function (user, error) {
                        console.log(error);
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            }
        };
        return parseUser;
    }]);