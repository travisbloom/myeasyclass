angular.module('myEasyClass')
    .factory('classesFactory', ['$q', function ($q) {
        var classesFactory = {
            parseClasses: null,
            angularClasses: null,
            getClasses: function () {
                var query, counter, classesArray = [], classesObj = {}, newResult, deferred = $q.defer(), course;
                if (classesFactory.angularClasses) {
                    return classesFactory.angularClasses;
                } else {
                    course = Parse.Object.extend("Course");
                    query = new Parse.Query(course);
                    query.limit = 300;
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
                        error: function (err) {
                            deferred.reject();
                        }
                    });
                    return deferred.promise;
                }
            }
        };
        return classesFactory;
    }]);