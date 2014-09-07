angular.module('myEasyClass')
    .factory('classesFactory', ['$q', 'userFactory', function ($q, userFactory) {
        var classesFactory = {
            //needed for parse interactions, stored as obj Ids
            parseClasses: null,
            //array of classes, cleaned of parse logic for angular manipulation
            angularClasses: null,
            /**
             * adds relation data to classes pulled from the parseClasses function
            * */
            getClasses: function () {
                var query, counter, classesArray = [], classesObj = {}, newResult, deferred = $q.defer(), course;
                //if the classes have already been loaded
                if (classesFactory.angularClasses) {
                    return classesFactory.angularClasses;
                } else {
                    course = Parse.Object.extend("Course");
                    query = new Parse.Query(course);
                    query.limit(100);
                    query.descending('Easiness');
                    query.find({
                        success: function (results) {
                            //configures the returned Parse Object from an extended backbone Obj to normal JSON
                            for (counter = 0; counter < results.length; counter++) {
                                //add the class to the responseArray
                                newResult = results[counter].attributes;
                                newResult.id = results[counter].id;
                                classesArray.push(newResult);
                                //add the class to the responseObj
                                classesObj[results[counter].id] = results[counter];
                            }
                            classesFactory.parseClasses = classesObj;
                            classesFactory.angularClasses = classesArray;
                            deferred.resolve(classesArray);
                        },
                        error: function () {
                            deferred.reject();
                        }
                    });
                    return deferred.promise;
                }
            }
        };
        return classesFactory;
    }]);