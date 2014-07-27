angular.module('myEasyClass')
    .factory('relationFactory', ['$q', 'userFactory', 'classesFactory', function ($q, userFactory, classesFactory)  {
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
            },
            vote: function (preference, classId) {
                var relation,
                    currentUser = userFactory.data.parseUser,
                    currentClass = classesFactory.parseClasses[classId];

                console.log(currentClass);
                //increment Easiness for course
                if(preference === 'liked'){
                    currentClass.increment("Easiness");
                    relation = currentUser.relation("ranked");
                } else {
                    currentClass.increment("Easiness", -1);
                    relation = currentUser.relation("dislikes");
                }
                currentClass.save();

                //create a relationship between the user and the course
                relation.add(currentClass);
                currentUser.save();
            }
        };
        return parseRelations;
    }]);