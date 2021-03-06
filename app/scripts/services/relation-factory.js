angular.module('myEasyClass')
    .factory('relationFactory', ['$q', 'classesFactory', 'userFactory', function ($q, classesFactory, userFactory)  {
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
                //iterate through the passed relationships
                for (counter = 0; counter < relationsArray.length; counter++) {
                        returnedPromises.push(queryRelation(relationsArray[counter]));
                }
                //return the array of promises once they have all been resolved
                return $q.all(returnedPromises);
            },
             /**
             * maps the requested relationships to their respective classes
             * */
            mapClassRelations: function (relationsArray) {
                var counter, retunedRelations = {}, classCounter, rankedCounter, dislikesCounter,
                    classes = classesFactory.angularClasses;
                return parseRelations.getRelations(relationsArray).then (function(data) {
                    //changes array of relations to an object with relation attributes
                    //TODO remove the need to do this, it's redundant
                    for (counter = 0; counter < data.length; counter++) {
                        retunedRelations[data[counter].rel] = data[counter].relatedIds;
                    }
                    //iterate through all the classes
                    for (classCounter = 0; classCounter < classes.length; classCounter++) {
                        //for each string in the ranked relation
                        for (rankedCounter = 0; rankedCounter < retunedRelations.ranked.length; rankedCounter++) {
                            if (classes[classCounter].id === retunedRelations.ranked[rankedCounter]) {
                                classes[classCounter].likedByCurrentUser = true;
                            }
                        }
                        //for each string in the dislikes relation
                        for (dislikesCounter = 0; dislikesCounter < retunedRelations.dislikes.length; dislikesCounter++) {
                            if (classes[classCounter].id === retunedRelations.dislikes[dislikesCounter]) {
                                classes[classCounter].dislikedByCurrentUser = true;
                            }
                        }
                    }
                    return classes;
                });
            },
             /**
             * downvote or upvote a class
              * if a user is logged in, increment the Easiness counter and changes the liked/dislikedByCurrentUser boolean on the angularClass
              * saves the new relationship between the user and the class to Parse, changes Easiness
              * calculate change amount (ex: a user who had voted a class up downvotes, Easiness should decrease 2 not 1)
             * */
            vote: function (preference, classId, index) {
                var deferred = $q.defer(), numChange, parseClass,
                    //needed to update user relations in parse
                    currentUser = Parse.User.current(),
                    //needed to quickly query relation data added to the class already by the relation factory
                    angularClass = classesFactory.angularClasses[index];
                //if theres no active user
                if (!currentUser) {
                    deferred.reject('You must be logged in to vote on a class');
                } else {
                    //instantiate a new instance of the Course Obj, link to the class by setting it's Id
                    parseClass = Parse.Object.extend("Course");
                    parseClass = new parseClass();
                    parseClass.id = classId;
                    //if a user is trying to like an item
                    if (preference === 'liked') {
                        //if the item has already been liked by a user
                        if (angularClass.likedByCurrentUser) {
                            numChange = -1;
                            currentUser.relation("ranked").remove(parseClass);
                            angularClass.likedByCurrentUser = false;
                            //if they dislike the class currently
                        } else if (angularClass.dislikedByCurrentUser) {
                            numChange = 2;
                            currentUser.relation("ranked").add(parseClass);
                            currentUser.relation("dislikes").remove(parseClass);
                            angularClass.likedByCurrentUser = true;
                            angularClass.dislikedByCurrentUser = false;
                            //if they haven't voted on the class
                        } else {
                            numChange = 1;
                            currentUser.relation("ranked").add(parseClass);
                            angularClass.likedByCurrentUser = true;
                        }
                    //if the user is trying to dislike an item
                    } else {
                        //if the item has already been disliked by a user
                        if (angularClass.dislikedByCurrentUser) {
                            numChange = 1;
                            currentUser.relation("dislikes").remove(parseClass);
                            angularClass.dislikedByCurrentUser = false;
                        //if they liked the class currently
                        } else if (angularClass.likedByCurrentUser) {
                            numChange = -2;
                            currentUser.relation("dislikes").add(parseClass);
                            currentUser.relation("ranked").remove(parseClass);
                            angularClass.likedByCurrentUser = false;
                            angularClass.dislikedByCurrentUser = true;
                        //if they haven't voted on the class
                        } else {
                            numChange = -1;
                            currentUser.relation("dislikes").add(parseClass);
                            angularClass.dislikedByCurrentUser = true;
                        }
                    }
                    angularClass.Easiness += numChange;
                    parseClass.increment("Easiness", numChange);
                    //save changes to Parse
                    parseClass.save();
                    currentUser.save();
                    deferred.resolve(angularClass);
                 }

                return deferred.promise;
            }
        };
        return parseRelations;
    }]);