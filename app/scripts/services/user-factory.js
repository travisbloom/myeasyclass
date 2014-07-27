angular.module('myEasyClass')
    .factory('userFactory', ['$q', function ($q) {
        var parseUser = {
            /**
             * Store user data/states to be used across scopes
            * */
            data: {
                username: null
            },
            /**
             * accepts a string that matches the relationship in Parse
             * returns a promise with the requested relationships
             * */
            queryRelation: function (relation) {
                var deferred = $q.defer(), counter, returnedArray = [],
                    relQuery = Parse.User.current().relation(relation);
                relQuery.query().find({
                    success:function(classes) {
                        /**
                         * abstract the class Id from the array
                         * */
                        for (counter = 0; counter < classes.length; counter ++) {
                            returnedArray.push(classes[counter].id);
                        }
                        console.log(returnedArray);
                        deferred.resolve({rel: relation, relatedIds: returnedArray});
                    },
                    error: function(error) {
                        deferred.reject(error);
                    }
                });
                return deferred.promise;
            },
            /**
             * accepts an array of relation fields to check
             * runs parseUser.currentUser to ensure there is a logged in user
             * iterates through the relations array, running queryRelation() for each
             * returns an object with arrays of Ids for each relation
            * */
            getRelations: function (relationsArray) {
                var deferred = $q.defer(), counter, relationshipObj = {}, error = false;
                //check that a user is logged in
                parseUser.currentUser().then(function () {
                    console.log('current user');
                    //iterate through the passed relationships
                    for (counter = 0; counter < relationsArray.length; counter++) {
                        console.log(relationsArray[counter]);
                        parseUser.queryRelation(relationsArray[counter]).then(function (data) {
                            //set the attribute of the relationshipObj to the relation string, add the array as the value
                            relationshipObj[data.rel] = data.relatedIds;
                        }, function (err) {
                            error = true;
                            //if one of the relationship queries errors out
                            relationshipObj[relationsArray[counter]] = {
                                error: err
                            }
                        });
                    }
                    //if none of the queries errored out
                    if (!error) {
                        deferred.resolve(relationshipObj);
                    } else {
                        deferred.reject(relationshipObj);
                    }
                }, function() {
                    deferred.reject('No user is currently logged in');
                 });
                return deferred.promise;
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