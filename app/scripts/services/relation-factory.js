angular.module('myEasyClass')
    .factory('relationFactory', ['$q', function ($q) {
         /**
         * accepts a string that matches the relationship in Parse
         * returns a promise with the requested relationships
         * */
         var queryRelation = function (relation) {
            var deferred = $q.defer(), counter, returnedArray = [],
                relQuery = Parse.User.current().relation(relation);
            relQuery.query().find({
                success: function (classes) {
                    /**
                     * abstract the class Id from the array
                     * */
                    for (counter = 0; counter < classes.length; counter++) {
                        returnedArray.push(classes[counter].id);
                    }
                    deferred.resolve({rel: relation, relatedIds: returnedArray});
                },
                error: function (error) {
                    deferred.reject(error);
                }
            });
            return deferred.promise;
        },
         parseRelations = {
            /**
             * accepts an array of relation fields to check
             * iterates through the relations array, running queryRelation() for each
             * returns an array of the promises
             * */
            getRelations: function (relationsArray) {
                var counter, returnedPromises = [];
                console.log('current user');
                //iterate through the passed relationships
                for (counter = 0; counter < relationsArray.length; counter++) {
                    //create an anon function to wrap the individual promises
                    (function () {
                        var deferred = $q.defer();
                        queryRelation(relationsArray[counter]).then(function (data) {
                            //set the attribute of the relationshipObj to the relation string, add the array as the value
                            deferred.resolve(data);
                        }, function (err) {
                            deferred.reject({error: err});
                        });
                        returnedPromises.push(deferred.promise);
                    })();
                }
                //return the array of promises once they have all been resolved
                return $q.all(returnedPromises);
            }
        };
        return parseRelations;
    }]);